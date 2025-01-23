INSERT INTO Products (title, price, description, stock, tags, createdAt, updatedAt) VALUES
                                                                                        ('Wakeboard Beginner', 299.99, 'Perfect for beginners.', 10, '["beginner", "board"]', NOW(), NOW()),
                                                                                        ('Wakeboard Pro', 499.99, 'Designed for professionals.', 5, '["pro", "high-performance"]', NOW(), NOW()),
                                                                                        ('Wakeboard Lightweight', 349.99, 'Lightweight and easy to handle.', 8, '["lightweight", "board"]', NOW(), NOW()),
                                                                                        ('Wakeboard All-Around', 399.99, 'Great for all skill levels.', 15, '["all-around", "versatile"]', NOW(), NOW()),
                                                                                        ('Wakeboard Durable', 450.00, 'Built to last in any condition.', 12, '["durable", "heavy-duty"]', NOW(), NOW());

INSERT INTO Tags (name, createdAt, updatedAt) VALUES
                                                  ('beginner', NOW(), NOW()),
                                                  ('pro', NOW(), NOW()),
                                                  ('high-performance', NOW(), NOW()),
                                                  ('lightweight', NOW(), NOW()),
                                                  ('all-around', NOW(), NOW()),
                                                  ('versatile', NOW(), NOW()),
                                                  ('durable', NOW(), NOW()),
                                                  ('heavy-duty', NOW(), NOW());

INSERT INTO ProductTags (productId, tagId, createdAt, updatedAt) VALUES
                                                                     (1, 1, NOW(), NOW()),
                                                                     (1, 4, NOW(), NOW()),
                                                                     (2, 2, NOW(), NOW()),
                                                                     (2, 3, NOW(), NOW()),
                                                                     (3, 4, NOW(), NOW()),
                                                                     (4, 5, NOW(), NOW()),
                                                                     (4, 6, NOW(), NOW()),
                                                                     (5, 7, NOW(), NOW()),
                                                                     (5, 8, NOW(), NOW());
