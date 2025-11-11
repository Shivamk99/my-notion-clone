import Image from 'next/image';

export const Heroes = () => {
  return (
    <div className={'flex max-w-5xl flex-col items-center justify-center'}>
      <div className={'flex items-center'}>
        <div
          className={
            'relative h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px]'
          }
        >
          <Image
            priority
            src={'/documents.png'}
            alt={'Document'}
            fill={true}
            className={'object-contain dark:hidden'}
          />
          <Image
            priority
            src={'/documents-dark.png'}
            alt={'Document'}
            fill={true}
            className={'hidden object-contain dark:block'}
          />
        </div>
        <div className={'relative hidden h-[400px] w-[400px] md:block'}>
          <Image
            src={'/reading.png'}
            alt={'Reading'}
            fill={true}
            className={'object-contain dark:hidden'}
          />
          <Image
            src={'/reading-dark.png'}
            alt={'Reading'}
            fill={true}
            className={'hidden object-contain dark:block'}
          />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
