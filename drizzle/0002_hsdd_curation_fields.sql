-- Curation fields for the HSDD 2026 import, and money in its own currency.
-- Hand-edited after drizzle-kit generate: the two UPDATEs copy the old USD
-- thousands into whole USD before ask_k and raised_k are dropped, so existing
-- rows keep their figures. Every column this adds is nullable or defaulted.
ALTER TABLE `smes` MODIFY COLUMN `city` varchar(80);--> statement-breakpoint
ALTER TABLE `smes` MODIFY COLUMN `stage` varchar(40);--> statement-breakpoint
ALTER TABLE `smes` MODIFY COLUMN `metrics` varchar(255);--> statement-breakpoint
ALTER TABLE `smes` ADD `province` varchar(80);--> statement-breakpoint
ALTER TABLE `smes` ADD `readiness` varchar(60);--> statement-breakpoint
ALTER TABLE `smes` ADD `ask_amount` bigint unsigned;--> statement-breakpoint
ALTER TABLE `smes` ADD `ask_currency` char(3);--> statement-breakpoint
ALTER TABLE `smes` ADD `raised_amount` bigint unsigned;--> statement-breakpoint
ALTER TABLE `smes` ADD `raised_currency` char(3);--> statement-breakpoint
ALTER TABLE `smes` ADD `legal_form` enum('pt','cv','none');--> statement-breakpoint
ALTER TABLE `smes` ADD `supporting_org` varchar(160);--> statement-breakpoint
ALTER TABLE `smes` ADD `valuation_terms` varchar(255);--> statement-breakpoint
ALTER TABLE `smes` ADD `use_of_funds` text;--> statement-breakpoint
ALTER TABLE `smes` ADD `curation_status` enum('approved','reserve');--> statement-breakpoint
ALTER TABLE `smes` ADD `product_category` varchar(160);--> statement-breakpoint
ALTER TABLE `smes` ADD `ask_currency_inferred` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `smes` ADD `ceo_name` varchar(200);--> statement-breakpoint
ALTER TABLE `smes` ADD `address` text;--> statement-breakpoint
ALTER TABLE `smes` ADD `potential_investors` text;--> statement-breakpoint
ALTER TABLE `smes` ADD `curation_notes` text;--> statement-breakpoint
ALTER TABLE `smes` ADD `pitch_deck_url` varchar(500);--> statement-breakpoint
ALTER TABLE `smes` ADD `data_quality_notes` text;--> statement-breakpoint
ALTER TABLE `smes` ADD `source` varchar(40);--> statement-breakpoint
ALTER TABLE `smes` ADD `source_ref` int;--> statement-breakpoint
ALTER TABLE `smes` ADD CONSTRAINT `smes_source_ref_uq` UNIQUE(`source`,`source_ref`);--> statement-breakpoint
UPDATE `smes` SET `ask_amount` = `ask_k` * 1000, `ask_currency` = 'USD';--> statement-breakpoint
UPDATE `smes` SET `raised_amount` = `raised_k` * 1000, `raised_currency` = 'USD' WHERE `raised_k` IS NOT NULL;--> statement-breakpoint
ALTER TABLE `smes` DROP COLUMN `ask_k`;--> statement-breakpoint
ALTER TABLE `smes` DROP COLUMN `raised_k`;