import {District} from 'models/District';
import {DistrictSearch} from 'models/DistrictSearch';

export function districtFilter(districts: District[], districtSearch?: DistrictSearch): District[] {
  let dataSource: District[] = districts;
  if (districtSearch?.id) {
    dataSource = dataSource.filter((district: District) => district.id = districtSearch?.id.equalTo);
  }
  if (districtSearch?.name) {
    dataSource = dataSource.filter((district: District) => {
      return district.name?.toLowerCase().startsWith(districtSearch?.name?.startsWith?.toLowerCase());
    });
  }
  if (districtSearch?.districtTypeId) {
    // tslint:disable-next-line:max-line-length
    dataSource = dataSource.filter((district: District) => district.districtTypeId === districtSearch?.districtTypeId?.equalTo);
  }
  return dataSource;
}
