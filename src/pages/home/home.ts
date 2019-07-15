import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { BatteryStatus } from '@ionic-native/battery-status';
import { Sensors, TYPE_SENSOR } from '@ionic-native/sensors';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';
import { sensorModel } from '../../Models/Sensors';
import { stripGeneratedFileSuffix } from '@angular/compiler/src/aot/util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  logo:string;
  model = new sensorModel();
  interval;


  constructor(
    
    public navCtrl: NavController, 
    platform: Platform, 
    private batteryStatus: BatteryStatus, 
    private sensors:Sensors,
    private geolocation:Geolocation
    ) 
    {
      this.logo = "https://pluma.binit.cloud/assets/Binit/images/logos/logo.png"
      
    // platform.ready().then(() => {
    //   this.initSensor();
    // })
  }

  //Sensor de Luz - retorna (Array) un valor único en lumenes
  initLightSensor() 
  {
    if(this.model.data != null || this.model.data != undefined)
      this.model = new sensorModel();

    if(this.interval != undefined)
      clearInterval(this.interval);
      
    //this.model.data = 0;
    this.sensors.disableSensor();
    this.model.Name = "LIGHT";
    this.sensors.enableSensor(TYPE_SENSOR.LIGHT);

    this.interval = setInterval(() => 
    {
      this.sensors.getState().then((resp) => 
    {
      this.model.data = 
      [
        "Lumenes",
        resp[0]
      ];
      console.log(this.model.data.length);
      }).catch((error) => 
      {
        console.log('Error', error);
        clearInterval(this.interval);
      });
    }, 300);
  };
  //Sensor de Orientacion - retorna (Array) con 3 valores x-y-z
  initOrientationSensor() 
  {
    if(this.model.data != null || this.model.data != undefined)
      this.model =  new sensorModel();

    if(this.interval != undefined)
      clearInterval(this.interval);
    // this.model.data = 0;
    this.sensors.disableSensor();
    this.model.Name = "ORIENTATION";
    this.sensors.enableSensor(TYPE_SENSOR.ORIENTATION);

    this.interval = setInterval(() => 
    {
      this.sensors.getState().then((resp) => 
    {
      this.model.data = 
      [
        resp[0],
        resp[1],
        resp[2] 
      ];
      console.log(this.model.data.length);
      }).catch((error) => 
      {
        console.log('Error', error);
        clearInterval(this.interval);
      });
    }, 300);
  };
  //Sensor de Temperatura Ambiente - retorna (Array) un valor único en celcius
  initATemperatureSensor() 
  {
    if(this.model.data != null || this.model.data != undefined)
      this.model =  new sensorModel();

    if(this.interval != undefined)
      clearInterval(this.interval);
    // this.model.data = 0;
    this.sensors.disableSensor();
    this.model.Name = "AMBIENT_TEMPERATURE";
    this.sensors.enableSensor(TYPE_SENSOR.AMBIENT_TEMPERATURE);

    this.interval = setInterval(() => 
    {
      this.sensors.getState().then((resp) => 
    {
      this.model.data = 
      [
        "Celsius",
        resp[0]
      ];
      console.log(this.model.data.length);
      }).catch((error) => 
      {
        console.log('Error', error);
        clearInterval(this.interval);
      });
    }, 300);
  };
  //Sensor de Proximidad - retorna (Array) un valor único en cm
  initProximitySensor() 
  {
    if(this.model.data != null || this.model.data != undefined)
      this.model =  new sensorModel();

    if(this.interval != undefined)
      clearInterval(this.interval);
    //this.model.data = 0;
    this.sensors.disableSensor();
    this.model.Name = "PROXIMITY";
    this.sensors.enableSensor(TYPE_SENSOR.PROXIMITY);

    this.interval = setInterval(() => 
    {
      this.sensors.getState().then((resp) => 
    {
      this.model.data = 
      [
        "Cm",
        resp[0]
      ];
      console.log(this.model.data.length);
      }).catch((error) => 
      {
        console.log('Error', error);
        clearInterval(this.interval);
      });
    }, 300);
  };
  //Sensor de Acelerometro
  initAccelerometerSensor() 
  {
    if(this.model.data != null || this.model.data != undefined)
      this.model =  new sensorModel();

    if(this.interval != undefined)
      clearInterval(this.interval);

    this.sensors.disableSensor();
    this.model.Name = "ACCELEROMETER";
    this.sensors.enableSensor(TYPE_SENSOR.ACCELEROMETER);

    this.interval = setInterval(() => 
    {
      this.sensors.getState().then((resp) => 
    {
      this.model.data = 
      [
        resp[0],
        resp[1],
        resp[2] 
      ];
      console.log(this.model.data.length);
      }).catch((error) => 
      {
        console.log('Error', error);
        clearInterval(this.interval);
      });
    }, 300);
  };
  //Bateria devuelve un objecto con data
  initBatteryStatus()
  {
    if(this.model.data != null || this.model.data != undefined)
      this.model = new sensorModel();

    if(this.interval != undefined)
      clearInterval(this.interval);

    this.model.Name = "Battery";
    this.sensors.disableSensor();
    this.batteryStatus.onChange().subscribe(status => 
      {
        
        this.model.data = 
        {
          Nivel : status.level,
          Enchufado : (status.isPlugged == true? "Enchufado":"No Enchufado")
        };
        console.log(this.model.data);
      });
  }
  //Geolocation devuelve un objeto con latitud y longitud
  initGeolocation()
  {
    if(this.model.data != null || this.model.data != undefined)
      this.model =  new sensorModel();

    if(this.interval != undefined)
      clearInterval(this.interval);

    this.model.Name = "Geolocation";
    this.sensors.disableSensor();
    this.geolocation.getCurrentPosition().then((resp) => 
    {
      console.log(resp);
      this.model.data = {
        Longitud : resp.coords.longitude,
        Latitud : resp.coords.latitude
      };
      alert(this.model.data.Latitud +" "+ this.model.data.Longitud);

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
}
