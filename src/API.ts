/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateProjectInput = {
  id?: string | null,
  title: string,
  description?: string | null,
  image?: S3ObjectInput | null,
  developers?: Array< DevelopersInput | null > | null,
  _version?: number | null,
};

export type S3ObjectInput = {
  bucket: string,
  region: string,
  key: string,
};

export type DevelopersInput = {
  sub: string,
  name: string,
  email: string,
};

export type ModelProjectConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelProjectConditionInput | null > | null,
  or?: Array< ModelProjectConditionInput | null > | null,
  not?: ModelProjectConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateProjectInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  image?: S3ObjectInput | null,
  developers?: Array< DevelopersInput | null > | null,
  _version?: number | null,
};

export type DeleteProjectInput = {
  id?: string | null,
  _version?: number | null,
};

export type ModelProjectFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelProjectFilterInput | null > | null,
  or?: Array< ModelProjectFilterInput | null > | null,
  not?: ModelProjectFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type CreateProjectMutationVariables = {
  input: CreateProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type CreateProjectMutation = {
  createProject:  {
    __typename: "Project",
    id: string,
    title: string,
    description: string | null,
    image:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    developers:  Array< {
      __typename: "Developers",
      sub: string,
      name: string,
      email: string,
    } | null > | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateProjectMutationVariables = {
  input: UpdateProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type UpdateProjectMutation = {
  updateProject:  {
    __typename: "Project",
    id: string,
    title: string,
    description: string | null,
    image:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    developers:  Array< {
      __typename: "Developers",
      sub: string,
      name: string,
      email: string,
    } | null > | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteProjectMutationVariables = {
  input: DeleteProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type DeleteProjectMutation = {
  deleteProject:  {
    __typename: "Project",
    id: string,
    title: string,
    description: string | null,
    image:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    developers:  Array< {
      __typename: "Developers",
      sub: string,
      name: string,
      email: string,
    } | null > | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type SyncProjectsQueryVariables = {
  filter?: ModelProjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncProjectsQuery = {
  syncProjects:  {
    __typename: "ModelProjectConnection",
    items:  Array< {
      __typename: "Project",
      id: string,
      title: string,
      description: string | null,
      image:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      developers:  Array< {
        __typename: "Developers",
        sub: string,
        name: string,
        email: string,
      } | null > | null,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
    } | null > | null,
    nextToken: string | null,
    startedAt: number | null,
  } | null,
};

export type GetProjectQueryVariables = {
  id: string,
};

export type GetProjectQuery = {
  getProject:  {
    __typename: "Project",
    id: string,
    title: string,
    description: string | null,
    image:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    developers:  Array< {
      __typename: "Developers",
      sub: string,
      name: string,
      email: string,
    } | null > | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListProjectsQueryVariables = {
  filter?: ModelProjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProjectsQuery = {
  listProjects:  {
    __typename: "ModelProjectConnection",
    items:  Array< {
      __typename: "Project",
      id: string,
      title: string,
      description: string | null,
      image:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      developers:  Array< {
        __typename: "Developers",
        sub: string,
        name: string,
        email: string,
      } | null > | null,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
    } | null > | null,
    nextToken: string | null,
    startedAt: number | null,
  } | null,
};

export type OnCreateProjectSubscription = {
  onCreateProject:  {
    __typename: "Project",
    id: string,
    title: string,
    description: string | null,
    image:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    developers:  Array< {
      __typename: "Developers",
      sub: string,
      name: string,
      email: string,
    } | null > | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateProjectSubscription = {
  onUpdateProject:  {
    __typename: "Project",
    id: string,
    title: string,
    description: string | null,
    image:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    developers:  Array< {
      __typename: "Developers",
      sub: string,
      name: string,
      email: string,
    } | null > | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteProjectSubscription = {
  onDeleteProject:  {
    __typename: "Project",
    id: string,
    title: string,
    description: string | null,
    image:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    developers:  Array< {
      __typename: "Developers",
      sub: string,
      name: string,
      email: string,
    } | null > | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
  } | null,
};
