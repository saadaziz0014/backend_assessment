# Kafka Implementation Summary

## Overview
This project involves setting up and optimizing Kafka for handling message streaming efficiently. It includes Kafka setup, producer and consumer implementation, and a notification service.

## Key Steps

### 1. **Understanding Kafka Architecture**
- Learned core concepts: **Topics, Partitions, Consumers, Consumer Groups**.
- Explored **Kafka's load balancing** mechanism.

### 2. **Setting Up Kafka**
- Used **Zookeeper** and **Confluent Kafka**.
- Created a **Docker Compose** file to run their images.

### 3. **Code Optimization**
- Optimized **boilerplate** code.
- Kept **client** as a separate module.
- Created an **admin file** for topic initialization and existence checks.

### 4. **Producer Setup**
- Updated the **producer**.
- Integrated the **separate client**.

### 5. **Consumer Service Implementation**
- Created a **consumer service** with an initial single **consumer group**.
- Designed it to allow future group updates.
- While consuming messages, **sent data to the notification service**.

### 6. **Notification Service**
- Built a **dedicated notification service**.
- Parsed **schema-based data** before insertion.
- Implemented a **paginated API** for fetching notifications.
- Added a **notification route** in `app.js`.

### 7. **Database Selection and Schema Validation**
- Chose **MongoDB** for **lightweight and flexible** data handling.
- Used **Zod** for **schema validation**.

## Conclusion
This setup ensures a **scalable and efficient Kafka-based messaging system**, with a structured consumer-producer workflow and integrated notification handling.

## References
- [Kafka Documentation](https://kafka.apache.org/documentation/)
- [Pyush Garg](https://youtu.be/ZJJHm_bd9Zo?si=WAxhA1bOXvEjeiZA)