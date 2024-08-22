import { RadioClient } from './utils/client';
import 'dotenv/config';
const client = new RadioClient();
client.login(process.env.TOKEN);