 import { Equipment, EquipmentStore } from "../models/equipments";
import supertest from "supertest";
import app from "../server";

const store = new EquipmentStore();

const request = supertest(app);

describe("Equipment Model", () => {
  let testedEquipment: Equipment = {} as Equipment;

  it("should return an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should return a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should return a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should return an update method", () => {
    expect(store.update).toBeDefined();
  });

  it("should return a delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("should return an equipment by category method", () => {
    expect(store.equipmentsByCategory).toBeDefined();
  });

  it("a create method should create an equpiment", async () => {
    const newEquipment = await store.create({
      name: "TCM",
      price: 175000,
      category: "FORKLIFT",
    });
    testedEquipment = newEquipment;
    //Check if user do not enter valid information about equipment
    if (testedEquipment === null || testedEquipment.id === null) {
      throw new Error("equipment has not been created");
    }
    expect(newEquipment).toEqual({
      id: testedEquipment.id,
      name: "TCM",
      price: 175000,
      category: "FORKLIFT",
    });
    testedEquipment = newEquipment;
  });

  it("an index method should return all equipments", async () => {
    const listOfAllEquipments: Equipment[] = await store.index();
    expect(listOfAllEquipments).toEqual([
      {
        id: testedEquipment.id,
        name: "TCM",
        price: 175000,
        category: "FORKLIFT",
      },
    ]);
  });

  it("a show method should return a specific equipment by its id", async () => {
    //check if the target equipment already exist or not
    if (testedEquipment === null || testedEquipment.id === null) {
      throw new Error("unable to show an equipment which does not exist");
    }
    const showEquipment: Equipment = await store.show(
      testedEquipment.id as string
    );
    expect(showEquipment).toEqual({
      id: testedEquipment.id,
      name: "TCM",
      price: 175000,
      category: "FORKLIFT",
    });
  }); 

    

  it("a delete method should delete equipments", async () => {
    //check if the target equipment to be deleted already exists
    if (testedEquipment === null || testedEquipment.id === null) {
      throw new Error("unable to delete an equipment which does not exist");
    }
    const deletedEquipment = await store.delete(testedEquipment.id as string);
    const listOfAllEquipments = await store.index();
    expect(listOfAllEquipments).toEqual([]);
    return deletedEquipment;
  }); 

 
 }); 
