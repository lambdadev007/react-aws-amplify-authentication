/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createContacts = /* GraphQL */ `
  mutation CreateContacts(
    $input: CreateContactsInput!
    $condition: ModelContactsConditionInput
  ) {
    createContacts(input: $input, condition: $condition) {
      id
      Name
      TeamName
      Role
      Gender
      Email
      Phone
      Region
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateContacts = /* GraphQL */ `
  mutation UpdateContacts(
    $input: UpdateContactsInput!
    $condition: ModelContactsConditionInput
  ) {
    updateContacts(input: $input, condition: $condition) {
      id
      Name
      TeamName
      Role
      Gender
      Email
      Phone
      Region
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteContacts = /* GraphQL */ `
  mutation DeleteContacts(
    $input: DeleteContactsInput!
    $condition: ModelContactsConditionInput
  ) {
    deleteContacts(input: $input, condition: $condition) {
      id
      Name
      TeamName
      Role
      Gender
      Email
      Phone
      Region
      createdAt
      updatedAt
      owner
    }
  }
`;
