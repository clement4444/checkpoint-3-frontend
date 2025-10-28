import { gql } from "@apollo/client";

// ajouter des pays
export const ADD_COUNTRY = gql`
  mutation AddCountry($data: NewCountryInput!) {
  addCountry(data: $data) {
    code
    name
    emoji
  }
}
`;