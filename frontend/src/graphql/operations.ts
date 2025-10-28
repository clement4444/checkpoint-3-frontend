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

// pour récupéré la liste des pays
export const Countries = gql`
  query Countries {
  countries {
    id
    code
    name
    emoji
  }
}
`;

// pour récupéré le détail d'un pays
export const Country = gql`
  query Country($code: String!) {
  country(code: $code) {
    id
    code
    name
    emoji
    continent {
      name
    }
  }
}
`;