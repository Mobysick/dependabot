import axios from 'axios';

// TODO: Fix any.
type GetResponse = {
  status: number;
  data?: any;
};

export class HttpApi {
  static async get(url: string): Promise<GetResponse> {
    const response = await axios.get(url);
    return { status: response.status, data: response.data };
  }
}
