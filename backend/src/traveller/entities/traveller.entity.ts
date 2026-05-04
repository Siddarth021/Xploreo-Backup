export enum Interest {
  ADVENTURE = "Adventure",
  CULTURE = "Culture",
  FOOD = "Food",
  NATURE = "Nature",
  HISTORY = "History",
}

export class Traveller {
    userId! : String;
    fname! : String;
    lname! : String;
    email! : String;
    phno! : Number;
    plang! : String[];
    bio! : Text;
    intrests! : Interest[];
}
