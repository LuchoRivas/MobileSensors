import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { BatteryStatus } from '@ionic-native/battery-status';
import { Sensors } from '@ionic-native/sensors/ngx';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';

declare var sensors;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  value: any;
  sensorName : any;
  error : any;
  logo:string;
  stat:any;
  coords:any;

  constructor(
    public navCtrl: NavController, 
    platform: Platform, 
    private batteryStatus: BatteryStatus, 
    private sensors:Sensors,
    private geolocation:Geolocation
    ) {
    this.value;
    this.logo = "https://pluma.binit.cloud/assets/Binit/images/logos/logo.png"
    
    // platform.ready().then(() => {
    //   this.initSensor();
    // })

  }

  //Sensor de Luz
  initLightSensor() 
  {
    sensors.disableSensor();

    sensors.enableSensor("LIGHT");
    this.sensorName = "LIGHT";
    this.value = 0;
    
    setInterval(() => 
    {
      sensors.getState((values) => { this.value =  values; }

     );
    
      
    }, 300);
    
  };
  //Sensor de Orientacion
  initOrientationSensor() 
  {
    sensors.disableSensor();

    sensors.enableSensor("ORIENTATION");
    this.sensorName = "ORIENTATION";
    this.value = 0;
    setInterval(() => 
    {
      sensors.getState((values) => { this.value = values; });
    }, 300);
    
  };
  //Sensor de Temperatura Ambiente
  initATemperatureSensor() 
  {
    sensors.disableSensor();

    sensors.enableSensor("AMBIENT_TEMPERATURE");
    this.sensorName = "AMB_TEMPERATURE";
    this.value = 0;
    setInterval(() => 
    {
      sensors.getState((values) => { this.value = values; });

    }, 300);
    
  };
  //Sensor de Proximidad
  initProximitySensor() 
  {
    sensors.disableSensor();

    sensors.enableSensor("PROXIMITY");
    this.sensorName = "PROXIMITY";
    this.value = 0;
    setInterval(() => 
    {
      sensors.getState((values) => { this.value = values; });
    }, 300);
    
  };
  //Sensor de Acelerometro
  initAccelerometerSensor() 
  {
    sensors.disableSensor();

    sensors.enableSensor("ACCELEROMETER");
    this.sensorName = "ACCELEROMETER";
    this.value = [];
    setInterval(() => 
    {
      sensors.getState((values) => 
      { 
        this.value = values;
      });
    }, 300);
    
  };
  //Bateria
  initBatteryStatus()
  {
    this.batteryStatus.onChange().subscribe(status => {
      console.log(status)
      this.stat = status
    });

  }
  //Geolocation
  initGeolocation()
  {
    // this.batteryStatus.onChange().subscribe(status => {
    //   console.log(status)
    //   this.stat = status
    // });
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp);
      this.coords = resp;
      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     

  }
}
