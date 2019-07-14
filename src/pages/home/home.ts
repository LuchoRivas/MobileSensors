import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { BatteryStatus } from '@ionic-native/battery-status';
import { Sensors, TYPE_SENSOR } from '@ionic-native/sensors';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';
import { sensorModel} from '../../Models/Sensors';
import { stripGeneratedFileSuffix } from '@angular/compiler/src/aot/util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  logo:string;
  model = new sensorModel();


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

  //Sensor de Luz
  initLightSensor() 
  {
    this.model.data = 0;
    this.sensors.disableSensor();
    this.model.Name = "TYPE_SENSOR.LIGHT";
    this.sensors.enableSensor(TYPE_SENSOR.LIGHT);

    let interval = setInterval(() => 
    {
      this.sensors.getState().then((resp) => 
    {
      console.log(resp);
      this.model.data = resp;
      }).catch((error) => 
      {
        console.log('Error', error);
        clearInterval(interval);
      });
    }, 300);
  };
  //Sensor de Orientacion
  initOrientationSensor() 
  {
    this.model.data = 0;
    this.sensors.disableSensor();
    this.model.Name = "TYPE_SENSOR.ORIENTATION";
    this.sensors.enableSensor(TYPE_SENSOR.ORIENTATION);

    let interval = setInterval(() => 
    {
      this.sensors.getState().then((resp) => 
    {
      console.log(resp);
      this.model.data = resp;
      }).catch((error) => 
      {
        console.log('Error', error);
        clearInterval(interval);
      });
    }, 300);
  };
  //Sensor de Temperatura Ambiente
  initATemperatureSensor() 
  {
    this.model.data = 0;
    this.sensors.disableSensor();
    this.model.Name = "TYPE_SENSOR.AMBIENT_TEMPERATURE";
    this.sensors.enableSensor(TYPE_SENSOR.AMBIENT_TEMPERATURE);

    let interval = setInterval(() => 
    {
      this.sensors.getState().then((resp) => 
    {
      console.log(resp);
      this.model.data = resp;
      }).catch((error) => 
      {
        console.log('Error', error);
        clearInterval(interval);
      });
    }, 300);
  };
  //Sensor de Proximidad
  initProximitySensor() 
  {
    this.model.data = 0;
    this.sensors.disableSensor();
    this.model.Name = "TYPE_SENSOR.PROXIMITY";
    this.sensors.enableSensor(TYPE_SENSOR.PROXIMITY);

    let interval = setInterval(() => 
    {
      this.sensors.getState().then((resp) => 
    {
      console.log(resp);
      this.model.data = resp;
      }).catch((error) => 
      {
        console.log('Error', error);
        clearInterval(interval);
      });
    }, 300);
  };
  //Sensor de Acelerometro
  initAccelerometerSensor() 
  {
    this.model.data = 0;
    this.sensors.disableSensor();
    this.model.Name = "TYPE_SENSOR.ACCELEROMETER";
    this.sensors.enableSensor(TYPE_SENSOR.ACCELEROMETER);

    let interval = setInterval(() => 
    {
      this.sensors.getState().then((resp) => 
    {
      console.log(resp);
      this.model.data = resp;
      }).catch((error) => 
      {
        console.log('Error', error);
        clearInterval(interval);
      });
    }, 300);
  };
  //Bateria
  initBatteryStatus()
  {
    this.model.Name = "Batery";
    this.sensors.disableSensor();
    this.batteryStatus.onChange().subscribe(status => 
      {
        console.log(status)
        this.model.data = 
        {
          Nivel : status.level,
          Enchufado : (status.isPlugged == true? "Enchufado":"No Enchufado")
        };
      });

  }
  //Geolocation
  initGeolocation()
  {
    if(this.model.data != null || this.model.data != undefined)
      this.model.data = "";

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
