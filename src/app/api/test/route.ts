import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  const options = {
    method: 'GET',
    url: 'https://fnrlxsnkiwnixhignqnygfmxse0zhyix.lambda-url.us-east-2.on.aws/',
  };

  try {
    const response = await axios.request(options);    
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to fetch currencies', error },
      { status: 500 }
    );
  }
}