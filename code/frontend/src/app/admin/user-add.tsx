import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Combobox } from '@/components/ui/combobox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router';

const UserAdd = () => {
  return (
    <>
      <SiteHeader title={'User Add'} />
      <section>
        <div className='flex flex-col gap-6 p-10'>
          <div className='flex gap-4'>
            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor='firstname'>First Name</Label>
              <Input type='text' id='firstname' placeholder='First Name' />
            </div>
            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor='lastname'>Last Name</Label>
              <Input type='text' id='lastname' placeholder='Last Name' />
            </div>
          </div>
          <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor='email'>Email</Label>
            <Input type='email' id='email' placeholder='Email' />
          </div>
          <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor='phone'>Phone</Label>
            <Input type='tel' id='phone' placeholder='Phone' />
          </div>
          <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor='address'>Address</Label>
            <Input type='text' id='address' placeholder='Address' />
          </div>
          <div className='grid w-full items-center gap-6 md:gap-4 md:grid-cols-2'>
            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor='userType'>User Type</Label>
              <Combobox
                className='w-full'
                items={[
                  { value: 'admin', label: 'Admin' },
                  { value: 'manager', label: 'Manager' },
                  { value: 'receptionist', label: 'Receptionist' },
                  { value: 'housekeeping', label: 'Housekeeping' },
                  { value: 'guest', label: 'Guest' },
                ]}
              />
            </div>

            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor='accessLevel'>Access Level</Label>
              <Input
                type='number'
                id='accessLevel'
                placeholder='Access Level'
              />
            </div>
          </div>
          <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor='password'>Password</Label>
            <Input type='password' id='password' placeholder='Password' />
          </div>
          <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor='roomType'>Preferred Room Type</Label>
            <Input type='text' id='roomType' placeholder='Room Type' />
          </div>
          <div className='flex items-center gap-4 py-2'>
            <div className='flex items-center gap-2'>
              <Checkbox id='isActive' defaultChecked className='w-4 h-4' />
              <Label htmlFor='isActive'>Is Active</Label>
            </div>
            <div className='flex items-center gap-2'>
              <Checkbox id='smoking' className='w-4 h-4' />
              <Label htmlFor='smoking'>Client Smokes</Label>
            </div>
          </div>
          <Button className='w-full'>Submit</Button>
          <Button variant={'outline'} className='w-full' asChild>
            <Link to={'/admin/user/list'}>Back</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export { UserAdd };
