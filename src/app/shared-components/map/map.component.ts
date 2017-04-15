import { Component, Input, OnInit, ElementRef, ViewChild, Output, EventEmitter, NgZone } from '@angular/core';
import { IChatRoom } from 'app/services/chat-rooms.service';


import { } from '@types/googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  host: { display: 'block' }
})
export class MapComponent implements OnInit {

  @Input() lat: number;
  @Input() lng: number;

  @Output() onClick = new EventEmitter;
  @ViewChild('mapContainer') mapContainer;

  public map : google.maps.Map;
  public markers: google.maps.Marker[] = [];

  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone
  ){}

  ngOnInit(){

    let latlng = new google.maps.LatLng(this.lat, this.lng);
    let markerImage = '/assets/images/map-marker.png';

    let mapProp = {
        center: latlng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: true,
        draggable: true,
        gestureHandling: 'greedy',
    };

    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapProp);

    this.map.addListener('click', (e) => {
      this.ngZone.run(() => {
        this.onClick.emit(e);
      });
    });
  }


  public addMarker(lat: number, lng: number, onClick: () => {}) {
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: this.map,
    });
    marker.addListener('click', () => {
      this.ngZone.run(onClick);
    });
    this.markers.push(marker);
  }

  public clearMarkers() {
    this.markers.forEach((marker) => {
      marker.setMap(null);
    });
    this.markers.length = 0;
  }


}

