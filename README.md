# FLTT (Flex-Layout to Tailwind)

This CLI helps you to migrate projects from the deprecated Angular Flex-Layout library to tailwindcss utility classes.
This package has for goal to cover all cases seen in the Angular Flex-Layout library.

**:construction: This project is still under development. Use it at your own risks. :construction:**

## Installation

Install the package globally using npm:
```bash
npm i -g flex-layout-to-tailwind
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

| Flex-Layout Attribute    | Static API         | Responsive API |
|--------------------------|--------------------|----------------|
| fxFlex, fxGrow, fxShrink | :white_check_mark: | :x:            |
| fxFlexOrder              | :white_check_mark: | :x:            |
| fxFlexOffset             | :x:                | :x:            |
| fxFlexAlign              | :x:                | :x:            |
| fxFlexFill, fxFill       | :white_check_mark: | No API         |
| gdArea                   | :x:                | :x:            |
| gdColumn                 | :x:                | :x:            |
| gdRow                    | :x:                | :x:            |
| gdGridAlign              | :x:                | :x:            |

### API for any element

| Flex-Layout Attribute | Static API | Responsive API |
|-----------------------|------------|----------------|
| fxHide                | :x:        | :x:            |
| fxShow                | :x:        | :x:            |
| ngClass               | :x:        | :x:            |
| ngStyle               | :x:        | :x:            |
| imgSrc                | :x:        | :x:            |

## Contributing

Want to report a bug or contribute some code? Amazing! Please read up on our guidelines for [contributing](https://github.com/synopss/migrate-angular-flex-to-tailwind/blob/main/CONTRIBUTING.md).

## Code of Conduct

Please read and follow our [Code of Conduct](https://github.com/synopss/migrate-angular-flex-to-tailwind/blob/main/CODE_OF_CONDUCT.md).

## License

This project is licensed under the MIT License.
