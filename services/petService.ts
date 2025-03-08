import { supabase } from "@/utils/supabase";
import { Pet } from "../types";

// Mock data for development
const mockPets: Pet[] = [
  {
    id: "1",
    name: "Max",
    species: "Dog",
    breed: "Golden Retriever",
    age: 3,
    created_at: new Date().toISOString(),
    owner_id: "123",
    logs_bodycondition: [],
    logs_vet_visits: [],
    logs_weight: [],
  },
  {
    id: "2",
    name: "Luna",
    species: "Cat",
    breed: "Siamese",
    age: 2,
    created_at: new Date().toISOString(),
    owner_id: "123",
    logs_bodycondition: [],
    logs_vet_visits: [],
    logs_weight: [],
  },
];

export const petService = {
  async getPets(): Promise<Pet[]> {
    const { data, error } = await supabase.from("pets").select(
      `
        id, name, species, breed, age, created_at, owner_id,
        logs_weight:weight_logs(*),
        logs_bodycondition:body_condition_logs(*),
        logs_vet_visits:vet_visit_logs(*)
      `
    );

    if (error) {
      throw new Error("Failed to fetch pets");
    }

    return data;
  },

  async getPetById(id: string): Promise<Pet | null> {
    const { data, error } = await supabase
      .from("pets")
      .select(
        `
      id, name, species, breed, age, created_at, owner_id,
      logs_weight:weight_logs(*),
      logs_bodycondition:body_condition_logs(*),
      logs_vet_visits:vet_visit_logs(*)
    `
      )
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(
        error.code === "PGRST116" ? "Pet not found" : "Failed to fetch pet"
      );
    } // Provide a user friendly error message

    return data;
  },

  async createPet(
    pet: Omit<
      Pet,
      | "id"
      | "created_at"
      | "logs_weight"
      | "logs_bodycondition"
      | "logs_vet_visits"
    >
  ): Promise<Pet> {
    const { data, error } = await supabase
      .from("pets")
      .insert([pet])
      .select()
      .single();

    if (error) {
      throw new Error("Failed to create pet");
    }

    return data;
  },

  async updatePet(id: string, updates: Partial<Pet>): Promise<Pet> {
    const { data, error } = await supabase
      .from("pets")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error("Failed to update pet");
    }

    return data;
  },

  async deletePet(id: string): Promise<void> {
    const { error } = await supabase.from("pets").delete().eq("id", id);

    if (error) {
      throw new Error("Failed to delete pet");
    }
  },
};
