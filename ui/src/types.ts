export interface CustomerName {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface CustomerContactDetails {
  type: string;
  value: string;
}

export interface CustomerAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface CustomerIdentityProof {
  type: string;
  value: string;
  issuedDate: string;
  expiryDate: string;
}

export interface Customer {
  id: number;
  name: CustomerName;
  dateOfBirth: string;
  contactDetails: CustomerContactDetails[];
  address: CustomerAddress;
  identityProofs: CustomerIdentityProof[];
}

export interface CustomerFormData {
  currentStep: number;
  name: CustomerName;
  dateOfBirth: string;
  address: CustomerAddress;
  contactDetails: CustomerContactDetails[];
  identityProofs: CustomerIdentityProof[];
}
