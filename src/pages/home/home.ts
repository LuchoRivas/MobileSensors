import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { BatteryStatus } from '@ionic-native/battery-status';
import { Sensors, TYPE_SENSOR } from '@ionic-native/sensors';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';

declare var sensors;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  value: any;
  sensorName : string;
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
    ) 
    {
      this.value;
      this.logo = "https://pluma.binit.cloud/assets/Binit/images/logos/logo.png"
    
    // platform.ready().then(() => {
    //   this.initSensor();
    // })
  }

  //Sensor de Luz
  initLightSensor() 
  {

    this.value = 0;
    this.sensors.disableSensor();
    this.sensorName = TYPE_SENSOR.LIGHT;
    this.sensors.enableSensor(TYPE_SENSOR.LIGHT);


    setInterval(() => 
    {
      this.sensors.getState().then((resp) => 
    {
      console.log(resp);
      this.value = resp;
      }).catch((error) => 
      {
        console.log('Error', error);
      });
    }, 300);
  };
  //Sensor de Orientacion
  initOrientationSensor() 
  {
    this.value = 0;
    this.sensors.disableSensor();
    this.sensorName = TYPE_SENSOR.ORIENTATION;
    this.sensors.enableSensor(TYPE_SENSOR.ORIENTATION);


    setInterval(() => 
    {
      this.sensors.getState().then((resp) => 
    {
      console.log(resp);
      this.value = resp;
      }).catch((error) => 
      {
        console.log('Error', error);
      });
    }, 300);
  };
  //Sensor de Temperatura Ambiente
  initATemperatureSensor() 
  {
    this.value = 0;
    this.sensors.disableSensor();
    this.sensorName = TYPE_SENSOR.AMBIENT_TEMPERATURE;
    this.sensors.enableSensor(TYPE_SENSOR.AMBIENT_TEMPERATURE);


    setInterval(() => 
    {
      this.sensors.getState().then((resp) => 
    {
      console.log(resp);
      this.value = resp;
      }).catch((error) => 
      {
        console.log('Error', error);
      });
    }, 300);
  };
  //Sensor de Proximidad
  initProximitySensor() 
  {

    this.value = 0;
    this.sensors.disableSensor();
    this.sensorName = TYPE_SENSOR.PROXIMITY;
    this.sensors.enableSensor(TYPE_SENSOR.PROXIMITY);


    setInterval(() => 
    {
      this.sensors.getState().then((resp) => 
    {
      console.log(resp);
      this.value = resp;
      }).catch((error) => 
      {
        console.log('Error', error);
      });
    }, 300);
  };
  //Sensor de Acelerometro
  initAccelerometerSensor() 
  {

    this.value = 0;
    this.sensors.disableSensor();
    this.sensorName = TYPE_SENSOR.ACCELEROMETER;
    this.sensors.enableSensor(TYPE_SENSOR.ACCELEROMETER);


    setInterval(() => 
    {
      this.sensors.getState().then((resp) => 
    {
      console.log(resp);
      this.value = resp;
      }).catch((error) => 
      {
        console.log('Error', error);
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
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp);
      this.coords = resp;

     }).catch((error) => {
       console.log('Error getting location', error);
     });
     

  }
}
