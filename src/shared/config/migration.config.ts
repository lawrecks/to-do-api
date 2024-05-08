import { DataSource } from 'typeorm';
import { getDataSourceConfig } from './data-source.config';

const dataSource = new DataSource(getDataSourceConfig());
export default dataSource;
