import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { signUpSchema, type SignUpFormValues } from "../schemas/auth.schema";
import { TermsOfConditionsDialog } from "./terms-of-conditions-dialog";

interface SignUpFormProps {
  onSubmit: (values: SignUpFormValues) => Promise<void>;
}

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [termsDialogOpen, setTermsDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="displayName">Display Name</Label>
        <Input
          id="displayName"
          placeholder="Jane Doe"
          autoComplete="name"
          aria-invalid={!!errors.displayName}
          {...register("displayName")}
        />
        {errors.displayName && (
          <p className="text-sm text-destructive">{errors.displayName.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          placeholder="jane_doe"
          autoComplete="username"
          aria-invalid={!!errors.username}
          {...register("username")}
        />
        {errors.username && (
          <p className="text-sm text-destructive">{errors.username.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="new-password"
            aria-invalid={!!errors.password}
            className="pr-10"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          aria-invalid={!!errors.confirmPassword}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="acceptedTerms"
          aria-invalid={!!errors.acceptedTerms}
          {...register("acceptedTerms")}
        />
        <Label htmlFor="acceptedTerms" className="text-sm font-normal cursor-pointer flex items-center gap-1">
          I accept the{" "}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setTermsDialogOpen(true);
            }}
            className="underline underline-offset-2 hover:no-underline transition-all"
          >
            Terms of Conditions
          </button>
        </Label>
      </div>
      {errors.acceptedTerms && (
        <p className="text-sm text-destructive">{errors.acceptedTerms.message}</p>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 data-icon="inline-start" className="animate-spin" />}
        Create account
      </Button>
    </form>

    <TermsOfConditionsDialog
      open={termsDialogOpen}
      onOpenChange={setTermsDialogOpen}
      onAccept={() => {
        setTermsDialogOpen(false);
      }}
    />
    </>
  );
}
