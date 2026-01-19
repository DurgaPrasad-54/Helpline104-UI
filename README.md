# AMRIT - Helpline104 Service

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) [![DeepWiki](https://img.shields.io/badge/DeepWiki-PSMRI%2FHelpline104--UI-blue)](https://deepwiki.com/PSMRI/Helpline104-UI)

The AMRIT Helpline104 service aims to provide comprehensive assistance to individuals in need. It offers a range of services such as medical advice, counseling, grievance resolution, and support during health emergencies. The helpline is designed to cater to the specific needs of callers, ensuring they receive the appropriate assistance.

## Features

- **Medical Advice**: Callers can receive medical advice from trained professionals through the helpline. The service provides guidance and recommendations based on the caller's health concerns.

- **Counseling**: The helpline offers counseling services to individuals who require emotional support. Trained professionals are available to provide guidance and help callers cope with various challenges.

- **Grievance Resolution**: Callers can raise general grievances, which are then tracked using a unique Grievance ID. This ensures that concerns are properly addressed and resolved in a timely manner.

- **Directory Service**: The helpline provides a directory service to help callers locate relevant healthcare facilities, doctors, and other medical resources. This feature assists individuals in finding the appropriate assistance they need.

- **Epidemic Outbreak Information**: During epidemic outbreaks, the helpline offers information and guidance to callers. This helps individuals stay informed about the outbreak, preventive measures, and available healthcare services.

- **Clinical Decision Support System (CDSS)**: The helpline incorporates a basic CDSS to provide clinical support for selected chief complaints. This system aids in providing accurate and reliable clinical guidance to callers.

- **Medicine Prescription and Delivery**: Medical officers (MO) within the helpline have the authority to prescribe medicines to callers. Prescriptions are delivered to beneficiaries through SMS, ensuring they have access to the necessary medication.

- **Psychiatric Consultation**: The helpline offers psychiatric consultations through a dedicated role known as the Program Director (PD). This allows individuals to receive mental health support and guidance when needed.

- **Maternal and Child Death Review**: The helpline has systems in place for Maternal Death Surveillance and Response (MDSR) and child death review (CDR). These systems enable the tracking and monitoring of maternal and child deaths, ensuring appropriate actions are taken.

## Building From Source

To build the Helpline104 microservice from source, follow these steps:

### Prerequisites

Ensure that the following prerequisites are met before building the MMU service:

* JDK 1.8
* Maven
* NPM/YARN
* Spring Boot v2
* MySQL

### Installation

To install the MMU module, please follow these steps:

1. Clone the repository to your local machine.
2. Install the dependencies and build the module:
   - Run the command `npm install`.
   - Run the command `npm run build`.
   - Run the command `mvn clean install`.
   - Run the command `npm start`.
3. Open your browser and access `http://localhost:4200/#/login` to view the login page of module.

## Usage

All the features of the Helpline104 service are exposed as REST endpoints. Refer to the Swagger API documentation for detailed information on how to use the service and interact with its functionalities.

The AMRIT Helpline104 module provides a comprehensive solution for managing various aspects of your application.

## Filing Issues

If you encounter any issues, bugs, or have feature requests, please file them in the [main AMRIT repository](https://github.com/PSMRI/AMRIT/issues). Centralizing all feedback helps us streamline improvements and address concerns efficiently.  

## Join Our Community

We’d love to have you join our community discussions and get real-time support!  
Join our [Discord server](https://discord.gg/FVQWsf5ENS) to connect with contributors, ask questions, and stay updated.  

<!-- 

# Iemrdash

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
-->
