import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-array',
  templateUrl: './my-array.component.html',
  styleUrls: ['./my-array.component.scss']
})
export class MyArrayComponent implements OnInit {

  form!: FormGroup;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      orders: this.fb.array([])
    })
    this.orders.push(this.addOrderControl());
  }

  get orders() {
    return this.form.controls.orders as FormArray;
  }

  get ordersArray() {
    return (this.form.controls.orders as FormArray).controls as FormGroup[];
  }

  private addOrderControl() {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }

  addEmptyOrder() {
    this.orders.push(this.addOrderControl());
  }

  removeOrder(i: number) {
    this.orders.removeAt(i);
  }

  print() {
    const orders = this.orders.value.filter((order: any) => order.name && order.quantity);
    console.log(orders);
  }
}
