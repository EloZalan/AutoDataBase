# Node Car API

This project is a simple Node.js backend API for managing car brands and types. It utilizes Express.js to handle HTTP requests and JSON files to store data.

## Project Structure

```
node-car-api
├── src
│   ├── index.js
│   ├── routes
│   │   ├── brands.js
│   │   └── types.js
│   ├── controllers
│   │   ├── brandsController.js
│   │   └── typesController.js
│   ├── services
│   │   ├── brandsService.js
│   │   └── typesService.js
│   └── data
│       ├── carBrands.json
│       └── carTypes.json
├── package.json
├── .gitignore
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd node-car-api
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```

2. The API will be running on `http://localhost:3000`.

## API Endpoints

### Car Brands

- **GET** `/api/brands` - Retrieve all car brands
- **GET** `/api/brands/:id` - Retrieve a specific car brand by ID
- **POST** `/api/brands` - Create a new car brand
- **PUT** `/api/brands/:id` - Update an existing car brand by ID
- **DELETE** `/api/brands/:id` - Delete a car brand by ID

### Car Types

- **GET** `/api/types` - Retrieve all car types
- **GET** `/api/types/:id` - Retrieve a specific car type by ID
- **POST** `/api/types` - Create a new car type
- **PUT** `/api/types/:id` - Update an existing car type by ID
- **DELETE** `/api/types/:id` - Delete a car type by ID

## Contributing

Feel free to submit issues or pull requests for any improvements or bug fixes.

## License

This project is licensed under the MIT License.