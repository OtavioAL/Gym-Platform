import 'ts-node/register';
import 'tsconfig-paths/register';
import { DataSource } from 'typeorm';
import datasource from './src/database/data-source';

export default datasource as DataSource;
