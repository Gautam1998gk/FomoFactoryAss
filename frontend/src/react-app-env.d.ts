// Define the type for the Bitcoin data object
export interface CrptoType {
  _id: string; // Unique identifier for the record
  code: string; // Cryptocurrency code (e.g., 'BTC')
  rate: number; // The rate of the cryptocurrency
  volume: number; // Volume of the cryptocurrency traded
  cap: number; // Market capitalization
  createdAt: string; // ISO date string for when the record was created
  updatedAt: string; // ISO date string for when the record was last updated
  __v: number; // Version key (usually used by Mongoose)
}
