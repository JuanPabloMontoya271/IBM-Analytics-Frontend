import { useState } from 'react';
import {
    BadgeDelta,
    Card,
    DeltaType,
    Dropdown,
    DropdownItem,
    MultiSelectBox,
    MultiSelectBoxItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
} from '@tremor/react';

type SalesPerson = {
  uid: string;
  org: string;
  work_location: string;
  certification: string;
  type: string;
};

const salesPeople: SalesPerson[] = [{"uid":"073296781IBM","org":"Finance and Operations","work_location":"Guadalajara, JAL, Mexico","certification":"IBM Certified Executive","issue_date":"2020-09-17","type":"badge"},{"uid":"073296781IBM","org":"Finance and Operations","work_location":"Guadalajara, JAL, Mexico","certification":"IBM Automation Essentials","issue_date":"2020-04-26","type":"badge"},{"uid":"073296781IBM","org":"Finance and Operations","work_location":"Guadalajara, JAL, Mexico","certification":"Enterprise Design Thinking Advocate","issue_date":"2020-02-18","type":"badge"},{"uid":"073296781IBM","org":"Finance and Operations","work_location":"Guadalajara, JAL, Mexico","certification":"IBM Quantum Conversations","issue_date":"2020-01-01","type":"badge"},{"uid":"073296781IBM","org":"Finance and Operations","work_location":"Guadalajara, JAL, Mexico","certification":"Enterprise Design Thinking - Team Essentials for AI","issue_date":"2019-09-25","type":"badge"},{"uid":"073296781IBM","org":"Finance and Operations","work_location":"Guadalajara, JAL, Mexico","certification":"IBM Agile Explorer","issue_date":"2019-08-22","type":"badge"},{"uid":"073296781IBM","org":"Finance and Operations","work_location":"Guadalajara, JAL, Mexico","certification":"Faculty Academy Instructor","issue_date":"2017-10-18","type":"badge"}]
function DataFrame() {
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedNames, setSelectedNames] = useState<string[]>([]);

    const isSalesPersonSelected = (salesPerson: SalesPerson) => (salesPerson.org === selectedStatus || selectedStatus === 'all')
    && (selectedNames.includes(salesPerson.uid) || selectedNames.length === 0);

    return (
        <Card>
            <div className="sm:mt-6 hidden sm:flex sm:start sm:space-x-2">
                <MultiSelectBox
                    onValueChange={ (value) => setSelectedNames(value) }
                    placeholder="Select Users"
                    className="max-w-xs"
                >
                    { salesPeople.map((item) => (
                        <MultiSelectBoxItem
                            key={ item.uid }
                            value={ item.uid }
                            text={ item.uid }
                        />
                    )) }
                </MultiSelectBox>
                <Dropdown
                    className="max-w-xs"
                    defaultValue="all"
                    onValueChange={ (value) => setSelectedStatus(value) }
                >
                    <DropdownItem value="all" text="All Locations" />
                    <DropdownItem value="Guadalajara, Jalisco" text="Guadalajara, Jalisco" />
              
                </Dropdown>
            </div>
            <div className="mt-6 sm:hidden space-y-2 sm:space-y-0">
                <MultiSelectBox
                    onValueChange={ (value) => setSelectedNames(value) }
                    placeholder="Select User"
                    className="max-w-full"
                >
                    { salesPeople.map((item) => (
                        <MultiSelectBoxItem
                            key={ item.uid }
                            value={ item.uid }
                            text={ item.uid }
                        />
                    )) }
                </MultiSelectBox>
                <Dropdown
                    className="max-w-full"
                    defaultValue="all"
                    onValueChange={ (value) => setSelectedStatus(value) }
                >
                    <DropdownItem value="all" text="All Organizations" />
                    <DropdownItem value="Guadalajara" text="Overperforming" />

                </Dropdown>
            </div>

            <Table className="sm:mt-6">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>UID</TableHeaderCell>
                        <TableHeaderCell className="text-right">Org</TableHeaderCell>
                        <TableHeaderCell className="text-right">
                            Work Location
                        </TableHeaderCell>
                        <TableHeaderCell className="text-right">
                           Certification
                        </TableHeaderCell>
                        <TableHeaderCell className="text-right">
                            Type
                        </TableHeaderCell>
                        
                    </TableRow>
                </TableHead>
                
                <TableBody>
                    { salesPeople
                        .filter((item) => isSalesPersonSelected(item))
                        .map((item) => (
                            <TableRow key={ item.uid }>
                                <TableCell>{ item.uid }</TableCell>
                                <TableCell className="text-right">{ item.org }</TableCell>
                                <TableCell className="text-right">{ item.work_location }</TableCell>
                                <TableCell className="text-right">{ item.certification }</TableCell>
                                <TableCell className="text-right">
                                    { item.type }
                                </TableCell>
                            
                            </TableRow>
                        )) }
                </TableBody>
            </Table>
        </Card>
    );
}

export default DataFrame