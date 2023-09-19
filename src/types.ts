export interface Patient {
  resourceType: string;
  id: string;
  extension: PatientExtension[];
  identifier: Identifier[];
  active: boolean;
  name: NameElement[];
  telecom: Telecom[];
  gender: Gender;
  birthDate: Date;
  deceasedBoolean: boolean;
  address: Address[];
  contact: Contact[];
  managingOrganization: ManagingOrganization;
}

export interface Address {
  use: string;
  line: string[];
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Contact {
  relationship: Relationship[];
  name?: ContactName;
  telecom?: Telecom[];
  organization?: Organization;
}

export interface ContactName {
  use: Use;
  text: string;
}

export enum Use {
  Usual = 'usual',
}

export interface Organization {
  display: string;
}

export interface Relationship {
  coding: Coding[];
  text?: Gender;
}

export interface Coding {
  system: string;
  code: string;
  display: Gender;
}

export enum Gender {
  Employer = 'Employer',
  Male = 'male',
  Sister = 'Sister',
  Unknown = 'Unknown',
}

export interface Telecom {
  system: string;
  value: string;
  use: string;
}

export interface PatientExtension {
  extension?: ExtensionExtension[];
  url: string;
  valueCodeableConcept?: ValueCodeableConcept;
}

export interface ExtensionExtension {
  url: URL;
  valueCoding?: Coding;
  valueString?: Gender;
}

export enum URL {
  OmbCategory = 'ombCategory',
  Text = 'text',
}

export interface ValueCodeableConcept {
  coding: Coding[];
}

export interface Identifier {
  extension?: IdentifierExtension[];
  use: Use;
  system: string;
  value: string;
  type?: Type;
}

export interface IdentifierExtension {
  url: string;
  valueString: string;
}

export interface Type {
  text: string;
}

export interface ManagingOrganization {
  reference: string;
  display: string;
}

export interface NameElement {
  use: string;
  text: string;
  family: string;
  given: string[];
}
