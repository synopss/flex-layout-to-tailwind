# MAFTT (migrate angular flex to tailwind)

This CLI helps you to migrate projects from the deprecated Angular Flex-Layout library to tailwindcss utility classes.
This package has for goal to cover all cases seen in the Angular Flex-Layout library.

**This project is still under development. Use it at your own risks.**

## Installation

Install the package globally using npm:
```bash
npm i -g migrate-angular-flex-to-tailwind
```

## Usage

You can use the CLI using:
```bash
maftt
```

Or you can directly provide the input of your project as an option:
```bash
maftt --input ./path/to/your/project
```

## Status

Flex-Layout has two APIs: a static and a responsive one. The first one is used to handle fixed values, the second one adds breakpoints to handle responsiveness.

This following tables show all attributes covered by the migration from this CLI.

### API for DOM containers

| Flex-Layout Attribute | Static API         | Responsive API |
|-----------------------|--------------------|----------------|
| fxLayout              | :white_check_mark: | :x:            |
| fxLayoutAlign         | :white_check_mark: | :x:            |
| fxLayoutGap           | :white_check_mark: | :x:            |
| gdAlignColumns        | :x:                | :x:            |
| gdAlignRows           | :x:                | :x:            |
| gdAreas               | :x:                | :x:            |
| gdAuto                | :x:                | :x:            |
| gdColumns             | :x:                | :x:            |
| gdGap                 | :x:                | :x:            |
| gdGridAlign           | :x:                | :x:            |
| gdRows                | :x:                | :x:            |


### API for DOM elements

| Flex-Layout Attribute | Static API      | Responsive API |
|-----------------------|-----------------|----------------|
| fxFlex                | :construction:  | :x:            |
| fxFlexOrder           | :x:             | :x:            |
| fxFlexOffset          | :x:             | :x:            |
| fxFlexAlign           | :x:             | :x:            |
| fxFlexFill, fxFill    | :construction:  | :x:            |
| gdArea                | :x:             | :x:            |
| gdColumn              | :x:             | :x:            |
| gdRow                 | :x:             | :x:            |
| gdGridAlign           | :x:             | :x:            |

### API for any element

| Flex-Layout Attribute | Static API | Responsive API |
|-----------------------|------------|----------------|
| fxHide                | :x:        | :x:            |
| fxShow                | :x:        | :x:            |
| ngClass               | :x:        | :x:            |
| ngStyle               | :x:        | :x:            |
| imgSrc                | :x:        | :x:            |
