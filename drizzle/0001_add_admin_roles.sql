-- Admin roles. The DEFAULT turns every admin who exists when this runs into a
-- superadmin (they could already do everything); the app always sets the role
-- explicitly when it creates a user, so the default never decides a new one.
ALTER TABLE `admin_users` ADD `role` enum('superadmin','kneks') DEFAULT 'superadmin' NOT NULL;
