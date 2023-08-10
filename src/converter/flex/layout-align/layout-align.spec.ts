import { expectValidConversion } from '../../../util/test-util';

describe('fxLayoutAlign directive migration', () => {
  it('should convert fxLayoutAlign with no value', () => {
    expectValidConversion(`<div fxLayoutAlign></div>`, 'flex justify-start content-stretch items-stretch');
  });

  it('should convert fxLayoutAlign with empty value', () => {
    expectValidConversion(`<div fxLayoutAlign=""></div>`, 'flex justify-start content-stretch items-stretch');
  });

  it('should convert fxLayoutAlign="start"', () => {
    expectValidConversion(`<div fxLayoutAlign="start"></div>`, 'flex justify-start content-stretch items-stretch');
  });

  it('should convert fxLayoutAlign="flex-start"', () => {
    expectValidConversion(`<div fxLayoutAlign="start"></div>`, 'flex justify-start content-stretch items-stretch');
  });

  it('should convert fxLayoutAlign="start stretch"', () => {
    expectValidConversion(
      `<div fxLayoutAlign="start stretch"></div>`,
      'flex justify-start content-stretch items-stretch',
    );
  });

  it('should convert fxLayoutAlign="flex-start stretch"', () => {
    expectValidConversion(
      `<div fxLayoutAlign="flex-start stretch"></div>`,
      'flex justify-start content-stretch items-stretch',
    );
  });

  it('should convert fxLayoutAlign="start start"', () => {
    expectValidConversion(`<div fxLayoutAlign="start start"></div>`, 'flex justify-start content-start items-start');
  });

  it('should convert fxLayoutAlign="start flex-start"', () => {
    expectValidConversion(
      `<div fxLayoutAlign="start flex-start"></div>`,
      'flex justify-start content-start items-start',
    );
  });

  it('should convert fxLayoutAlign="start center"', () => {
    expectValidConversion(`<div fxLayoutAlign="start center"></div>`, 'flex justify-start content-center items-center');
  });

  it('should convert fxLayoutAlign="start end"', () => {
    expectValidConversion(`<div fxLayoutAlign="start end"></div>`, 'flex justify-start content-end items-end');
  });

  it('should convert fxLayoutAlign="start flex-end"', () => {
    expectValidConversion(`<div fxLayoutAlign="start flex-end"></div>`, 'flex justify-start content-end items-end');
  });

  it('should convert fxLayoutAlign="start space-around"', () => {
    expectValidConversion(
      `<div fxLayoutAlign="start space-around"></div>`,
      'flex justify-start content-around items-around',
    );
  });

  it('should convert fxLayoutAlign="start space-between', () => {
    expectValidConversion(
      `<div fxLayoutAlign="start space-between"></div>`,
      'flex justify-start content-between items-between',
    );
  });

  it('should convert fxLayoutAlign="start baseline', () => {
    expectValidConversion(
      `<div fxLayoutAlign="start baseline"></div>`,
      'flex justify-start content-baseline items-baseline',
    );
  });

  it('should convert fxLayoutAlign="center', () => {
    expectValidConversion(`<div fxLayoutAlign="center"></div>`, 'flex justify-center content-stretch items-stretch');
  });

  it('should convert fxLayoutAlign="center stretch', () => {
    expectValidConversion(
      `<div fxLayoutAlign="center stretch"></div>`,
      'flex justify-center content-stretch items-stretch',
    );
  });

  it('should convert fxLayoutAlign="center start', () => {
    expectValidConversion(`<div fxLayoutAlign="center start"></div>`, 'flex justify-center content-start items-start');
  });

  it('should convert fxLayoutAlign="center flex-start', () => {
    expectValidConversion(
      `<div fxLayoutAlign="center flex-start"></div>`,
      'flex justify-center content-start items-start',
    );
  });

  it('should convert fxLayoutAlign="center center', () => {
    expectValidConversion(
      `<div fxLayoutAlign="center center"></div>`,
      'flex justify-center content-center items-center',
    );
  });

  it('should convert fxLayoutAlign="center end', () => {
    expectValidConversion(`<div fxLayoutAlign="center end"></div>`, 'flex justify-center content-end items-end');
  });

  it('should convert fxLayoutAlign="center flex-end', () => {
    expectValidConversion(`<div fxLayoutAlign="center flex-end"></div>`, 'flex justify-center content-end items-end');
  });

  it('should convert fxLayoutAlign="center space-around', () => {
    expectValidConversion(
      `<div fxLayoutAlign="center space-around"></div>`,
      'flex justify-center content-around items-around',
    );
  });

  it('should convert fxLayoutAlign="center space-between', () => {
    expectValidConversion(
      `<div fxLayoutAlign="center space-between"></div>`,
      'flex justify-center content-between items-between',
    );
  });

  it('should convert fxLayoutAlign="center baseline', () => {
    expectValidConversion(
      `<div fxLayoutAlign="center baseline"></div>`,
      'flex justify-center content-baseline items-baseline',
    );
  });

  it('should convert fxLayoutAlign="end"', () => {
    expectValidConversion(`<div fxLayoutAlign="end"></div>`, 'flex justify-end content-stretch items-stretch');
  });

  it('should convert fxLayoutAlign="flex-end"', () => {
    expectValidConversion(`<div fxLayoutAlign="flex-end"></div>`, 'flex justify-end content-stretch items-stretch');
  });

  it('should convert fxLayoutAlign="end stretch"', () => {
    expectValidConversion(`<div fxLayoutAlign="end stretch"></div>`, 'flex justify-end content-stretch items-stretch');
  });

  it('should convert fxLayoutAlign="flex-end stretch"', () => {
    expectValidConversion(
      `<div fxLayoutAlign="flex-end stretch"></div>`,
      'flex justify-end content-stretch items-stretch',
    );
  });

  it('should convert fxLayoutAlign="end start"', () => {
    expectValidConversion(`<div fxLayoutAlign="end start"></div>`, 'flex justify-end content-start items-start');
  });

  it('should convert fxLayoutAlign="end flex-start"', () => {
    expectValidConversion(`<div fxLayoutAlign="end flex-start"></div>`, 'flex justify-end content-start items-start');
  });

  it('should convert fxLayoutAlign="end center"', () => {
    expectValidConversion(`<div fxLayoutAlign="end center"></div>`, 'flex justify-end content-center items-center');
  });

  it('should convert fxLayoutAlign="end end"', () => {
    expectValidConversion(`<div fxLayoutAlign="end end"></div>`, 'flex justify-end content-end items-end');
  });

  it('should convert fxLayoutAlign="end flex-end"', () => {
    expectValidConversion(`<div fxLayoutAlign="end flex-end"></div>`, 'flex justify-end content-end items-end');
  });

  it('should convert fxLayoutAlign="end space-around"', () => {
    expectValidConversion(
      `<div fxLayoutAlign="end space-around"></div>`,
      'flex justify-end content-around items-around',
    );
  });

  it('should convert fxLayoutAlign="end space-between', () => {
    expectValidConversion(
      `<div fxLayoutAlign="end space-between"></div>`,
      'flex justify-end content-between items-between',
    );
  });

  it('should convert fxLayoutAlign="end baseline', () => {
    expectValidConversion(
      `<div fxLayoutAlign="end baseline"></div>`,
      'flex justify-end content-baseline items-baseline',
    );
  });

  it('should convert fxLayoutAlign="space-around', () => {
    expectValidConversion(
      `<div fxLayoutAlign="space-around"></div>`,
      'flex justify-around content-stretch items-stretch',
    );
  });

  it('should convert fxLayoutAlign="space-around stretch', () => {
    expectValidConversion(
      `<div fxLayoutAlign="space-around stretch"></div>`,
      'flex justify-around content-stretch items-stretch',
    );
  });

  it('should convert fxLayoutAlign="space-around start', () => {
    expectValidConversion(
      `<div fxLayoutAlign="space-around start"></div>`,
      'flex justify-around content-start items-start',
    );
  });

  it('should convert fxLayoutAlign="space-around flex-start', () => {
    expectValidConversion(
      `<div fxLayoutAlign="space-around flex-start"></div>`,
      'flex justify-around content-start items-start',
    );
  });

  it('should convert fxLayoutAlign="space-around center', () => {
    expectValidConversion(
      `<div fxLayoutAlign="space-around center"></div>`,
      'flex justify-around content-center items-center',
    );
  });

  it('should convert fxLayoutAlign="space-around end', () => {
    expectValidConversion(`<div fxLayoutAlign="space-around end"></div>`, 'flex justify-around content-end items-end');
  });

  it('should convert fxLayoutAlign="space-around flex-end', () => {
    expectValidConversion(
      `<div fxLayoutAlign="space-around flex-end"></div>`,
      'flex justify-around content-end items-end',
    );
  });

  it('should convert fxLayoutAlign="space-around space-around', () => {
    expectValidConversion(
      `<div fxLayoutAlign="space-around space-around"></div>`,
      'flex justify-around content-around items-around',
    );
  });

  it('should convert fxLayoutAlign="space-around space-between', () => {
    expectValidConversion(
      `<div fxLayoutAlign="space-around space-between"></div>`,
      'flex justify-around content-between items-between',
    );
  });

  it('should convert fxLayoutAlign="space-around baseline', () => {
    expectValidConversion(
      `<div fxLayoutAlign="space-around baseline"></div>`,
      'flex justify-around content-baseline items-baseline',
    );
  });

  it('should convert fxLayoutAlign="space-between', () => {
    expectValidConversion(
      `<div fxLayoutAlign="space-between"></div>`,
      'flex justify-between content-stretch items-stretch',
    );
  });

  it('should convert fxLayoutAlign="space-between stretch', () => {
    expectValidConversion(
      `<div fxLayoutAlign="space-between stretch"></div>`,
      'flex justify-between content-stretch items-stretch',
    );
  });

  it('should convert fxLayoutAlign="space-between start', () => {
    expectValidConversion(
      `<div fxLayoutAlign="space-between start"></div>`,
      'flex justify-between content-start items-start',
    );
  });

  it('should convert fxLayoutAlign="space-between flex-start', () => {
    expectValidConversion(
      `<div fxLayoutAlign="space-between flex-start"></div>`,
      'flex justify-between content-start items-start',
    );
  });

  it('should convert fxLayoutAlign="space-between center', () => {
    expectValidConversion(
      `<div fxLayoutAlign="space-between center"></div>`,
      'flex justify-between content-center items-center',
    );
  });

  it('should convert fxLayoutAlign="space-between end', () => {
    expectValidConversion(
      `<div fxLayoutAlign="space-between end"></div>`,
      'flex justify-between content-end items-end',
    );
  });

  it('should convert fxLayoutAlign="space-between flex-end', () => {
    expectValidConversion(
      `<div fxLayoutAlign="space-between flex-end"></div>`,
      'flex justify-between content-end items-end',
    );
  });

  it('should convert fxLayoutAlign="space-between space-around', () => {
    expectValidConversion(
      `<div fxLayoutAlign="space-between space-around"></div>`,
      'flex justify-between content-around items-around',
    );
  });

  it('should convert fxLayoutAlign="space-between space-between', () => {
    expectValidConversion(
      `<div fxLayoutAlign="space-between space-between"></div>`,
      'flex justify-between content-between items-between',
    );
  });

  it('should convert fxLayoutAlign="space-between baseline', () => {
    expectValidConversion(
      `<div fxLayoutAlign="space-between baseline"></div>`,
      'flex justify-between content-baseline items-baseline',
    );
  });

  it('should convert fxLayoutAlign="space-evenly', () => {
    expectValidConversion(
      `<div fxLayoutAlign="space-evenly"></div>`,
      'flex justify-evenly content-stretch items-stretch',
    );
  });

  it('should convert fxLayoutAlign="space-evenly stretch', () => {
    expectValidConversion(
      `<div fxLayoutAlign="space-evenly stretch"></div>`,
      'flex justify-evenly content-stretch items-stretch',
    );
  });

  it('should convert fxLayoutAlign="space-evenly start', () => {
    expectValidConversion(
      `<div fxLayoutAlign="space-evenly start"></div>`,
      'flex justify-evenly content-start items-start',
    );
  });

  it('should convert fxLayoutAlign="space-evenly flex-start', () => {
    expectValidConversion(
      `<div fxLayoutAlign="space-evenly flex-start"></div>`,
      'flex justify-evenly content-start items-start',
    );
  });

  it('should convert fxLayoutAlign="space-evenly center', () => {
    expectValidConversion(
      `<div fxLayoutAlign="space-evenly center"></div>`,
      'flex justify-evenly content-center items-center',
    );
  });

  it('should convert fxLayoutAlign="space-evenly end', () => {
    expectValidConversion(`<div fxLayoutAlign="space-evenly end"></div>`, 'flex justify-evenly content-end items-end');
  });

  it('should convert fxLayoutAlign="space-evenly flex-end', () => {
    expectValidConversion(
      `<div fxLayoutAlign="space-evenly flex-end"></div>`,
      'flex justify-evenly content-end items-end',
    );
  });

  it('should convert fxLayoutAlign="space-evenly space-around', () => {
    expectValidConversion(
      `<div fxLayoutAlign="space-evenly space-around"></div>`,
      'flex justify-evenly content-around items-around',
    );
  });

  it('should convert fxLayoutAlign="space-evenly space-between', () => {
    expectValidConversion(
      `<div fxLayoutAlign="space-evenly space-between"></div>`,
      'flex justify-evenly content-between items-between',
    );
  });

  it('should convert fxLayoutAlign="space-evenly baseline', () => {
    expectValidConversion(
      `<div fxLayoutAlign="space-evenly baseline"></div>`,
      'flex justify-evenly content-baseline items-baseline',
    );
  });
});
