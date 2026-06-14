import { pool } from "../config/db";

export const saveProfile = async (
  reportId: number,
  profile: any
) => {

  const result =
    await pool.query(
      `
      INSERT INTO person_profiles
      (
        report_id,
        age_estimate,
        gender,
        clothing,
        hair,
        notable_features
      )
      VALUES
      ($1,$2,$3,$4,$5,$6)
      RETURNING *
      `,
      [
        reportId,
        profile.age,
        profile.gender,
        profile.clothing,
        profile.hair,
        profile.features,
      ]
    );

  return result.rows[0];
};