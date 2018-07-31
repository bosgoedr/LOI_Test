import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Off1:boolean = true;
  Off2:boolean = true;
  Off3:boolean = true;
  Off4:boolean = true;
  pinInput: any;
  strCode: string;
  noPinSet:boolean;
  noCompletePin:boolean;

  constructor(public navCtrl: NavController,private storage: Storage) {
    this.pinInput = [null,null,null,null]
    this.isPinCodeSet();
  }

  isPinCodeSet(){
    this.storage.get('myPin').then((data) => {
      if(data) {
        this.noPinSet = false;
      }
      else {
        this.noPinSet = true;
      }
    });
  }

  chkInlogCode(){
    let strPinInput:string;
    strPinInput = this.pinInput[0] + '' + this.pinInput[1] + '' + this.pinInput[2] + '' + this.pinInput[3];
    this.storage.get('myPin').then((data) => {
      if (data) {
        if (strPinInput==data){
          console.log ('Inloggen maar')
        }
        else{
          console.log ('foutieve code')
        }        
      }
      else{
        if (strPinInput=="0000") {
          console.log('inloggen')
        }
        else{
        console.log('fout niet inloggen')
        }
      }
    });
    this.clearPinCode();
  }

  clearData(){
    this.storage.clear();
  }
 
  setFirstCode(){
    let strPinInput:string;
    strPinInput = this.pinInput[0] + '' + this.pinInput[1] + '' + this.pinInput[2] + '' + this.pinInput[3];
    if (strPinInput.length == 4) {
      this.storage.set('myPin',strPinInput)
      console.log('code gemaakt');
      this.noPinSet = false;
      this.noCompletePin = false;
      this.clearPinCode();
    }
    else{
      console.log('pin niet compleet');
      this.noPinSet = true;
      this.noCompletePin = true;
      this.clearPinCode();
    }

  }

  insertPin(intCode){
    if (this.pinInput[0]==null){
      this.pinInput[0] = intCode;
      this.Off1 = false;
    }
    else
    {
      if (this.pinInput[1]==null){
        this.pinInput[1] = intCode;
        this.Off2 = false;
      }
      else
      {
        if (this.pinInput[2]==null){
          this.pinInput[2] = intCode;
          this.Off3 = false;
        }
        else
        {
          if (this.pinInput[3]==null){
          this.pinInput[3] = intCode;
          this.Off4 = false;
          }
        }
      }
    }

     //this.pinInput[1] = intCode;
    console.log('Your code is', this.pinInput[0],this.pinInput[1],this.pinInput[2],this.pinInput[3]);

  }

  clearPinCode(){
    this.Off1 = true;
    this.Off2 = true;
    this.Off3 = true;
    this.Off4 = true;
    this.pinInput = [null,null,null,null]
  }
}
