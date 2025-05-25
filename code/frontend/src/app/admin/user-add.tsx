import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
            <Label htmlFor='subject'>Subject</Label>
            <Input type='text' id='subject' placeholder='Subject' />
          </div>
          <Button className='w-full'>Submit</Button>
        </div>
      </section>
    </>
  );
};

export { UserAdd };
