import { Injectable } from '@nestjs/common';
import { getToken } from '../shared/functions/getToken';
import { Patient } from '../types';
import { Fhir } from 'fhir';

const fhir = new Fhir();

@Injectable()
export class EpicApiService {
  async getPatients(): Promise<Patient[]> {
    const accessToken = await getToken();
    const epicEndpoint = process.env.EPIC_ENDPOINT;
    const patientListId = process.env.PATIENT_LIST_ID;

    const url = `${epicEndpoint}api/FHIR/STU3/List/${patientListId}`;

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      const patients = data.entry;

      const patientData = [];

      await Promise.all(
        patients.map(async (patient) => {
          const patientResponse = await fetch(patient.item.reference, options);

          const individualPatientData = await patientResponse.json();

          const xml = fhir.objToXml(individualPatientData);
          const obj = fhir.xmlToObj(xml);

          patientData.push(obj);
        }),
      );

      return patientData;
    } catch (error) {
      console.error(error);
    }
  }
}
