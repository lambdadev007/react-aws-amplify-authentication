/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getContacts = /* GraphQL */ `
  query GetContacts($id: ID!) {
    getContacts(id: $id) {
      id
      Name
      TeamName
      Role
      Gender
      Email
      Phone
      Region
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listContactss = /* GraphQL */ `
  query ListContactss(
    $filter: ModelContactsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContactss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Name
        TeamName
        Role
        Gender
        Email
        Phone
        Region
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
