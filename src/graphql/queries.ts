// tslint:disable
// this is an auto generated file. This will be overwritten

export const syncProjects = /* GraphQL */ `
  query SyncProjects(
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProjects(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
          permissions
        }
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getProject = /* GraphQL */ `
  query GetProject($id: ID!) {
    getProject(id: $id) {
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
export const listProjects = /* GraphQL */ `
  query ListProjects(
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          permissions
        }
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
