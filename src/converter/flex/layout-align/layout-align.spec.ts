import { convertTag } from '../../converter';

describe('fxLayoutAlign directive migration', () => {
  it('should convert fxLayoutAlign default value', () => {
    expect(convertTag(`<div fxLayoutAlign>`)).toEqual(`<div class="flex justify-start content-stretch items-stretch">`);
    expect(convertTag(`<div fxLayoutAlign="">`)).toEqual(
      `<div class="flex justify-start content-stretch items-stretch">`,
    );
  });

  it('should convert fxLayoutAlign="start"', () => {
    expect(convertTag(`<div fxLayoutAlign="start">`)).toEqual(
      `<div class="flex justify-start content-stretch items-stretch">`,
    );
    expect(convertTag(`<div fxLayoutAlign="flex-start">`)).toEqual(
      `<div class="flex justify-start content-stretch items-stretch">`,
    );
    expect(convertTag(`<div fxLayoutAlign="start stretch">`)).toEqual(
      `<div class="flex justify-start content-stretch items-stretch">`,
    );
    expect(convertTag(`<div fxLayoutAlign="flex-start stretch">`)).toEqual(
      `<div class="flex justify-start content-stretch items-stretch">`,
    );
    expect(convertTag(`<div fxLayoutAlign="start start">`)).toEqual(
      `<div class="flex justify-start content-start items-start">`,
    );
    expect(convertTag(`<div fxLayoutAlign="start flex-start">`)).toEqual(
      `<div class="flex justify-start content-start items-start">`,
    );
    expect(convertTag(`<div fxLayoutAlign="start center">`)).toEqual(
      `<div class="flex justify-start content-center items-center">`,
    );
    expect(convertTag(`<div fxLayoutAlign="start end">`)).toEqual(
      `<div class="flex justify-start content-end items-end">`,
    );
    expect(convertTag(`<div fxLayoutAlign="start flex-end">`)).toEqual(
      `<div class="flex justify-start content-end items-end">`,
    );
    expect(convertTag(`<div fxLayoutAlign="start space-around">`)).toEqual(
      `<div class="flex justify-start content-around items-around">`,
    );
    expect(convertTag(`<div fxLayoutAlign="start space-between">`)).toEqual(
      `<div class="flex justify-start content-between items-between">`,
    );
    expect(convertTag(`<div fxLayoutAlign="start baseline">`)).toEqual(
      `<div class="flex justify-start content-baseline items-baseline">`,
    );
  });

  it('should convert fxLayoutAlign="center"', () => {
    expect(convertTag(`<div fxLayoutAlign="center">`)).toEqual(
      `<div class="flex justify-center content-stretch items-stretch">`,
    );
    expect(convertTag(`<div fxLayoutAlign="center stretch">`)).toEqual(
      `<div class="flex justify-center content-stretch items-stretch">`,
    );
    expect(convertTag(`<div fxLayoutAlign="center start">`)).toEqual(
      `<div class="flex justify-center content-start items-start">`,
    );
    expect(convertTag(`<div fxLayoutAlign="center flex-start">`)).toEqual(
      `<div class="flex justify-center content-start items-start">`,
    );
    expect(convertTag(`<div fxLayoutAlign="center center">`)).toEqual(
      `<div class="flex justify-center content-center items-center">`,
    );
    expect(convertTag(`<div fxLayoutAlign="center end">`)).toEqual(
      `<div class="flex justify-center content-end items-end">`,
    );
    expect(convertTag(`<div fxLayoutAlign="center flex-end">`)).toEqual(
      `<div class="flex justify-center content-end items-end">`,
    );
    expect(convertTag(`<div fxLayoutAlign="center space-around">`)).toEqual(
      `<div class="flex justify-center content-around items-around">`,
    );
    expect(convertTag(`<div fxLayoutAlign="center space-between">`)).toEqual(
      `<div class="flex justify-center content-between items-between">`,
    );
    expect(convertTag(`<div fxLayoutAlign="center baseline">`)).toEqual(
      `<div class="flex justify-center content-baseline items-baseline">`,
    );
  });

  it('should convert fxLayoutAlign="end"', () => {
    expect(convertTag(`<div fxLayoutAlign="end">`)).toEqual(
      `<div class="flex justify-end content-stretch items-stretch">`,
    );
    expect(convertTag(`<div fxLayoutAlign="flex-end">`)).toEqual(
      `<div class="flex justify-end content-stretch items-stretch">`,
    );
    expect(convertTag(`<div fxLayoutAlign="end stretch">`)).toEqual(
      `<div class="flex justify-end content-stretch items-stretch">`,
    );
    expect(convertTag(`<div fxLayoutAlign="flex-end stretch">`)).toEqual(
      `<div class="flex justify-end content-stretch items-stretch">`,
    );
    expect(convertTag(`<div fxLayoutAlign="end start">`)).toEqual(
      `<div class="flex justify-end content-start items-start">`,
    );
    expect(convertTag(`<div fxLayoutAlign="end flex-start">`)).toEqual(
      `<div class="flex justify-end content-start items-start">`,
    );
    expect(convertTag(`<div fxLayoutAlign="end center">`)).toEqual(
      `<div class="flex justify-end content-center items-center">`,
    );
    expect(convertTag(`<div fxLayoutAlign="end end">`)).toEqual(`<div class="flex justify-end content-end items-end">`);
    expect(convertTag(`<div fxLayoutAlign="end flex-end">`)).toEqual(
      `<div class="flex justify-end content-end items-end">`,
    );
    expect(convertTag(`<div fxLayoutAlign="end space-around">`)).toEqual(
      `<div class="flex justify-end content-around items-around">`,
    );
    expect(convertTag(`<div fxLayoutAlign="end space-between">`)).toEqual(
      `<div class="flex justify-end content-between items-between">`,
    );
    expect(convertTag(`<div fxLayoutAlign="end baseline">`)).toEqual(
      `<div class="flex justify-end content-baseline items-baseline">`,
    );
  });

  it('should convert fxLayoutAlign="space-around"', () => {
    expect(convertTag(`<div fxLayoutAlign="space-around">`)).toEqual(
      `<div class="flex justify-around content-stretch items-stretch">`,
    );
    expect(convertTag(`<div fxLayoutAlign="space-around stretch">`)).toEqual(
      `<div class="flex justify-around content-stretch items-stretch">`,
    );
    expect(convertTag(`<div fxLayoutAlign="space-around start">`)).toEqual(
      `<div class="flex justify-around content-start items-start">`,
    );
    expect(convertTag(`<div fxLayoutAlign="space-around flex-start">`)).toEqual(
      `<div class="flex justify-around content-start items-start">`,
    );
    expect(convertTag(`<div fxLayoutAlign="space-around center">`)).toEqual(
      `<div class="flex justify-around content-center items-center">`,
    );
    expect(convertTag(`<div fxLayoutAlign="space-around end">`)).toEqual(
      `<div class="flex justify-around content-end items-end">`,
    );
    expect(convertTag(`<div fxLayoutAlign="space-around flex-end">`)).toEqual(
      `<div class="flex justify-around content-end items-end">`,
    );
    expect(convertTag(`<div fxLayoutAlign="space-around space-around">`)).toEqual(
      `<div class="flex justify-around content-around items-around">`,
    );
    expect(convertTag(`<div fxLayoutAlign="space-around space-between">`)).toEqual(
      `<div class="flex justify-around content-between items-between">`,
    );
    expect(convertTag(`<div fxLayoutAlign="space-around baseline">`)).toEqual(
      `<div class="flex justify-around content-baseline items-baseline">`,
    );
  });

  it('should convert fxLayoutAlign="space-between"', () => {
    expect(convertTag(`<div fxLayoutAlign="space-between">`)).toEqual(
      `<div class="flex justify-between content-stretch items-stretch">`,
    );
    expect(convertTag(`<div fxLayoutAlign="space-between stretch">`)).toEqual(
      `<div class="flex justify-between content-stretch items-stretch">`,
    );
    expect(convertTag(`<div fxLayoutAlign="space-between start">`)).toEqual(
      `<div class="flex justify-between content-start items-start">`,
    );
    expect(convertTag(`<div fxLayoutAlign="space-between flex-start">`)).toEqual(
      `<div class="flex justify-between content-start items-start">`,
    );
    expect(convertTag(`<div fxLayoutAlign="space-between center">`)).toEqual(
      `<div class="flex justify-between content-center items-center">`,
    );
    expect(convertTag(`<div fxLayoutAlign="space-between end">`)).toEqual(
      `<div class="flex justify-between content-end items-end">`,
    );
    expect(convertTag(`<div fxLayoutAlign="space-between flex-end">`)).toEqual(
      `<div class="flex justify-between content-end items-end">`,
    );
    expect(convertTag(`<div fxLayoutAlign="space-between space-around">`)).toEqual(
      `<div class="flex justify-between content-around items-around">`,
    );
    expect(convertTag(`<div fxLayoutAlign="space-between space-between">`)).toEqual(
      `<div class="flex justify-between content-between items-between">`,
    );
    expect(convertTag(`<div fxLayoutAlign="space-between baseline">`)).toEqual(
      `<div class="flex justify-between content-baseline items-baseline">`,
    );
  });

  it('should convert fxLayoutAlign="space-evenly"', () => {
    expect(convertTag(`<div fxLayoutAlign="space-evenly">`)).toEqual(
      `<div class="flex justify-evenly content-stretch items-stretch">`,
    );
    expect(convertTag(`<div fxLayoutAlign="space-evenly stretch">`)).toEqual(
      `<div class="flex justify-evenly content-stretch items-stretch">`,
    );
    expect(convertTag(`<div fxLayoutAlign="space-evenly start">`)).toEqual(
      `<div class="flex justify-evenly content-start items-start">`,
    );
    expect(convertTag(`<div fxLayoutAlign="space-evenly flex-start">`)).toEqual(
      `<div class="flex justify-evenly content-start items-start">`,
    );
    expect(convertTag(`<div fxLayoutAlign="space-evenly center">`)).toEqual(
      `<div class="flex justify-evenly content-center items-center">`,
    );
    expect(convertTag(`<div fxLayoutAlign="space-evenly end">`)).toEqual(
      `<div class="flex justify-evenly content-end items-end">`,
    );
    expect(convertTag(`<div fxLayoutAlign="space-evenly flex-end">`)).toEqual(
      `<div class="flex justify-evenly content-end items-end">`,
    );
    expect(convertTag(`<div fxLayoutAlign="space-evenly space-around">`)).toEqual(
      `<div class="flex justify-evenly content-around items-around">`,
    );
    expect(convertTag(`<div fxLayoutAlign="space-evenly space-between">`)).toEqual(
      `<div class="flex justify-evenly content-between items-between">`,
    );
    expect(convertTag(`<div fxLayoutAlign="space-evenly baseline">`)).toEqual(
      `<div class="flex justify-evenly content-baseline items-baseline">`,
    );
  });
});
