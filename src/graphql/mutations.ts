// tslint:disable
// this is an auto generated file. This will be overwritten

export const createProject = /* GraphQL */ `
  mutation CreateProject(
    $input: CreateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    createProject(input: $input, condition: $condition) {
      id
      title
      description
      image {
        bucket
        region
        key
      }
      listEmployeeWithoutGroup {
        sub
        name
        email
        position
        permissions
      }
      listGroupEmployee {
        groupName
        listEmployee {
          sub
          name
          email
        }
        permissions
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateProject = /* GraphQL */ `
  mutation UpdateProject(
    $input: UpdateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    updateProject(input: $input, condition: $condition) {
      id
      title
      description
      image {
        bucket
        region
        key
      }
      listEmployeeWithoutGroup {
        sub
        name
        email
        position
        permissions
      }
      listGroupEmployee {
        groupName
        listEmployee {
          sub
          name
          email
        }
        permissions
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteProject = /* GraphQL */ `
  mutation DeleteProject(
    $input: DeleteProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    deleteProject(input: $input, condition: $condition) {
      id
      title
      description
      image {
        bucket
        region
        key
      }
      listEmployeeWithoutGroup {
        sub
        name
        email
        position
        permissions
      }
      listGroupEmployee {
        groupName
        listEmployee {
          sub
          name
          email
        }
        permissions
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
