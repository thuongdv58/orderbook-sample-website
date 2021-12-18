import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'orderbook-sample-website';
  bid: any
  ask: any
  totalAskingSize: number = 0
  totalBiddingValue: number = 0

  constructor(private socketService: SocketService) {
  }

  ngOnInit() {
    this.socketService.socket.emit('events', {})

    this.socketService.socket.on('events', (data) => {
      this.bid = data.bid && data.bid.map((t:any) => t.map((i: any) => parseFloat(i)));
      this.ask = data.ask && data.ask.map((t:any) => t.map((i: any) => parseFloat(i)));
      if(this.bid && this.ask) {
        this.totalAskingSize = this.ask.reduce((total : any, t: any) => total + t[1], 0)
        this.totalBiddingValue = this.bid.reduce((total: any, t: any) => total + t[0] * t[1], 0)
      }
    });

    this.socketService.socket.on('exception', (data) => {
      console.log('event', data);
    });

    this.socketService.socket.on('disconnect', () => {
      console.log('Disconnected');
    });
  }
}
