import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, Send, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import scholarshipsBanner from "@/assets/scholarships-banner.jpg";
import { useSubmitScholarshipApplication } from "@/hooks/useScholarshipApplications";

const schema = z.object({
  full_name: z.string().min(1, "Name is required"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  home_address: z.string().min(1, "Home address is required"),
  campus_address: z.string().optional(),
  phone_home: z.string().optional(),
  phone_cell: z.string().optional(),
  email: z.string().email("Valid email is required"),
  us_citizen: z.boolean(),
  parent_org_membership: z.string().optional(),
  portuguese_ancestry: z.string().min(1, "Please describe your Portuguese ancestry"),
  education: z
    .array(
      z.object({
        institution: z.string().min(1, "Institution is required"),
        dates: z.string().min(1, "Dates are required"),
        majorMinor: z.string().min(1, "Major/Minor is required"),
      })
    )
    .min(1, "At least one education entry is required"),
  current_gpa: z.string().min(1, "GPA is required"),
  anticipated_graduation: z.string().optional(),
  activities: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      type: z.string().min(1, "Type is required"),
      hoursPerMonth: z.string().min(1, "Hours are required"),
    })
  ),
  awards: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      year: z.string().min(1, "Year is required"),
    })
  ),
  essay: z.string().min(100, "Essay must be at least 100 characters"),
  certified: z.literal(true, {
    errorMap: () => ({ message: "You must certify this application" }),
  }),
});

type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";
const labelClass = "block text-sm font-semibold text-foreground mb-1";
const errorClass = "text-xs text-destructive mt-1";

const ScholarshipApplication = () => {
  const [submitted, setSubmitted] = useState(false);
  const submitApplication = useSubmitScholarshipApplication();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      us_citizen: true,
      education: [{ institution: "", dates: "", majorMinor: "" }],
      activities: [],
      awards: [],
      certified: undefined as unknown as true,
    },
  });

  const educationFields = useFieldArray({ control, name: "education" });
  const activityFields = useFieldArray({ control, name: "activities" });
  const awardFields = useFieldArray({ control, name: "awards" });

  const onSubmit = async (data: FormData) => {
    try {
      await submitApplication.mutateAsync(data);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <PageBanner
          title="Scholarship Application"
          subtitle="Day of Portugal Scholarship Program"
          image={scholarshipsBanner}
        />
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-600" size={40} />
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Application Submitted!
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Thank you for applying to the Day of Portugal Scholarship Program.
                Your application has been received and will be reviewed by the Scholarship Committee.
              </p>
              <p className="text-muted-foreground text-sm">
                Please remember to also mail your official transcripts and have two instructors submit recommendation forms.
              </p>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageBanner
        title="Scholarship Application"
        subtitle="Day of Portugal Scholarship Program"
        image={scholarshipsBanner}
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Deadline notice */}
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-8 text-center">
              <p className="text-primary font-semibold">
                Application Deadline: April 30
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Incomplete or late applications will not be considered.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              {/* A. Personal Information */}
              <fieldset className="space-y-4">
                <legend className="font-display text-xl font-bold text-primary border-b border-border pb-2 mb-4 w-full">
                  A. Personal Information
                </legend>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input {...register("full_name")} className={inputClass} />
                    {errors.full_name && <p className={errorClass}>{errors.full_name.message}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Date of Birth *</label>
                    <input type="date" {...register("date_of_birth")} className={inputClass} />
                    {errors.date_of_birth && <p className={errorClass}>{errors.date_of_birth.message}</p>}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Home Address *</label>
                  <input {...register("home_address")} className={inputClass} />
                  {errors.home_address && <p className={errorClass}>{errors.home_address.message}</p>}
                </div>

                <div>
                  <label className={labelClass}>Campus Residence Address (if applicable)</label>
                  <input {...register("campus_address")} className={inputClass} />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Phone (Home)</label>
                    <input type="tel" {...register("phone_home")} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Phone (Cell)</label>
                    <input type="tel" {...register("phone_cell")} className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Email *</label>
                  <input type="email" {...register("email")} className={inputClass} />
                  {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                </div>

                <div>
                  <label className={labelClass}>U.S. Citizen or Permanent Legal Resident? *</label>
                  <div className="flex gap-4 mt-1">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="radio" value="true" {...register("us_citizen", { setValueAs: (v) => v === "true" })} defaultChecked />
                      Yes
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="radio" value="false" {...register("us_citizen", { setValueAs: (v) => v === "true" })} />
                      No
                    </label>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Parent's Portuguese RI Organization Membership (if applicable)</label>
                  <input {...register("parent_org_membership")} className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Portuguese Ancestry *</label>
                  <p className="text-xs text-muted-foreground mb-1">In a few words, explain your Portuguese ancestry</p>
                  <textarea {...register("portuguese_ancestry")} rows={3} className={inputClass} />
                  {errors.portuguese_ancestry && <p className={errorClass}>{errors.portuguese_ancestry.message}</p>}
                </div>
              </fieldset>

              {/* B. Educational Background */}
              <fieldset className="space-y-4">
                <legend className="font-display text-xl font-bold text-primary border-b border-border pb-2 mb-4 w-full">
                  B. Educational Background
                </legend>
                <p className="text-sm text-muted-foreground -mt-2">
                  List High Schools, Trade and Technical Schools, or Colleges/Universities attended.
                </p>

                {educationFields.fields.map((field, index) => (
                  <div key={field.id} className="grid sm:grid-cols-[1fr_auto_1fr_auto] gap-3 items-end">
                    <div>
                      <label className={labelClass}>Institution *</label>
                      <input {...register(`education.${index}.institution`)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Dates *</label>
                      <input {...register(`education.${index}.dates`)} className={inputClass} placeholder="e.g. 2020-2024" />
                    </div>
                    <div>
                      <label className={labelClass}>Major/Minor *</label>
                      <input {...register(`education.${index}.majorMinor`)} className={inputClass} />
                    </div>
                    {educationFields.fields.length > 1 && (
                      <button type="button" onClick={() => educationFields.remove(index)} className="p-2 text-destructive hover:bg-destructive/10 rounded-md">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
                {errors.education && <p className={errorClass}>{errors.education.message || errors.education.root?.message}</p>}
                <button
                  type="button"
                  onClick={() => educationFields.append({ institution: "", dates: "", majorMinor: "" })}
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  <Plus size={14} /> Add another institution
                </button>

                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className={labelClass}>Current GPA * (Minimum 3.0 required)</label>
                    <input {...register("current_gpa")} className={inputClass} placeholder="e.g. 3.5" />
                    {errors.current_gpa && <p className={errorClass}>{errors.current_gpa.message}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Anticipated Graduation Date</label>
                    <input {...register("anticipated_graduation")} className={inputClass} placeholder="e.g. 05/2026" />
                  </div>
                </div>
              </fieldset>

              {/* C. Extra-Curricular Activities */}
              <fieldset className="space-y-4">
                <legend className="font-display text-xl font-bold text-primary border-b border-border pb-2 mb-4 w-full">
                  C. Extra-Curricular Activities
                </legend>
                <p className="text-sm text-muted-foreground -mt-2">
                  List all extra-curricular activities including clubs, organizations, community service, and employment you are presently involved in.
                </p>

                {activityFields.fields.map((field, index) => (
                  <div key={field.id} className="grid sm:grid-cols-[1fr_auto_auto_auto] gap-3 items-end">
                    <div>
                      <label className={labelClass}>Name of Organization/Activity *</label>
                      <input {...register(`activities.${index}.name`)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Type *</label>
                      <input {...register(`activities.${index}.type`)} className={inputClass} placeholder="e.g. Club, Volunteer" />
                    </div>
                    <div>
                      <label className={labelClass}>Hours/Month *</label>
                      <input {...register(`activities.${index}.hoursPerMonth`)} className={inputClass} placeholder="e.g. 10" />
                    </div>
                    <button type="button" onClick={() => activityFields.remove(index)} className="p-2 text-destructive hover:bg-destructive/10 rounded-md">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => activityFields.append({ name: "", type: "", hoursPerMonth: "" })}
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  <Plus size={14} /> Add activity
                </button>
              </fieldset>

              {/* D. Awards and Special Recognition */}
              <fieldset className="space-y-4">
                <legend className="font-display text-xl font-bold text-primary border-b border-border pb-2 mb-4 w-full">
                  D. Awards & Special Recognition
                </legend>
                <p className="text-sm text-muted-foreground -mt-2">
                  List any awards, merit scholarships, and special recognition during your academic career.
                </p>

                {awardFields.fields.map((field, index) => (
                  <div key={field.id} className="grid sm:grid-cols-[1fr_auto_auto] gap-3 items-end">
                    <div>
                      <label className={labelClass}>Award / Scholarship / Recognition *</label>
                      <input {...register(`awards.${index}.name`)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Year *</label>
                      <input {...register(`awards.${index}.year`)} className={inputClass} placeholder="e.g. 2024" />
                    </div>
                    <button type="button" onClick={() => awardFields.remove(index)} className="p-2 text-destructive hover:bg-destructive/10 rounded-md">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => awardFields.append({ name: "", year: "" })}
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  <Plus size={14} /> Add award
                </button>
              </fieldset>

              {/* E. Personal Essay */}
              <fieldset className="space-y-4">
                <legend className="font-display text-xl font-bold text-primary border-b border-border pb-2 mb-4 w-full">
                  E. Personal Essay
                </legend>
                <p className="text-sm text-muted-foreground -mt-2">
                  Tell us about yourself. What are your special talents, skills and/or achievements? Discuss any
                  particular challenges or obstacles in working towards your goals. What are your specific career
                  goals and/or your aspirations for the future? How has Portuguese culture positively influenced
                  your life? What additional information would you like the Scholarship Committee to consider?
                </p>
                <textarea
                  {...register("essay")}
                  rows={12}
                  className={inputClass}
                  placeholder="Write your essay here..."
                />
                {errors.essay && <p className={errorClass}>{errors.essay.message}</p>}
              </fieldset>

              {/* F. Certification */}
              <fieldset className="space-y-4">
                <legend className="font-display text-xl font-bold text-primary border-b border-border pb-2 mb-4 w-full">
                  F. Certification
                </legend>
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("certified")}
                      className="mt-1"
                    />
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      I certify that all the information included in this application is true and complete.
                      I hereby grant permission to Day of Portugal and Portuguese Heritage in RI, Inc.
                      to verify such information and release notice of the award to the donor(s) or
                      potential donor(s) of any scholarship for which I may be eligible.
                    </span>
                  </label>
                  {errors.certified && <p className={errorClass}>{errors.certified.message}</p>}
                </div>
              </fieldset>

              {/* Additional reminders */}
              <div className="bg-card border border-border rounded-lg p-5 space-y-2">
                <p className="text-sm font-semibold text-foreground">Remember to also submit:</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Official academic transcripts mailed to: Scholarship Committee, RI Day of Portugal, P.O. Box 9464, Providence, RI 02940</li>
                  <li>Two Instructor's Recommendation forms completed by current teachers or professors</li>
                </ul>
              </div>

              {/* Submit */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-10 py-4 rounded-md bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-colors shadow-portugal disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                  <Send size={18} />
                </button>
                {submitApplication.isError && (
                  <p className="text-destructive text-sm mt-3">
                    {submitApplication.error instanceof Error
                      ? submitApplication.error.message
                      : "Failed to submit. Please try again."}
                  </p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ScholarshipApplication;
