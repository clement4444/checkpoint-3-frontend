import { gql } from "@apollo/client";

// test
export const TESTE = gql`
   query Countries {
    countries {
    id
    code
    name
    emoji
  }
}
`;