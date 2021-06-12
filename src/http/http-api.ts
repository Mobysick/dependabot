import axios from 'axios';

export class HttpApi {
  static get(url: string) {
    return axios.get(url);
  }
}
