// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateProject = /* GraphQL */ `
  subscription OnCreateProject {
    onCreateProject {
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
export const onUpdateProject = /* GraphQL */ `
  subscription OnUpdateProject {
    onUpdateProject {
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
export const onDeleteProject = /* GraphQL */ `
  subscription OnDeleteProject {
    onDeleteProject {
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
