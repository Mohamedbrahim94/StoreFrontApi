import supertest from "supertest";
import app from "../server";
import { User, UserStore } from "../models/users";
import { Equipment, EquipmentStore } from "../models/equipments";
import { Order, OrderStore } from "../models/order";


const request = supertest(app);

const ordStore = new OrderStore();


describe("Order Model", () => {

  it("should return an index method", () => {
    expect(ordStore.index).toBeDefined();
  });

  it("should return a show method", () => {
    expect(ordStore.show).toBeDefined();
  });

  it("should return a create method", () => {
    expect(ordStore.create).toBeDefined();
  });

  it("should return an update method", () => {
    expect(ordStore.update).toBeDefined();
  });

  it("should return a delete method", () => {
    expect(ordStore.delete).toBeDefined();
  });

  it("should return an addEquipment method", () => {
    expect(ordStore.addEquipment).toBeDefined();
  });

});
