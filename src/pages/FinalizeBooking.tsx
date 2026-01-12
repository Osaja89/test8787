import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const bookingSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters").max(100, "Full name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(5, "Phone number must be at least 5 characters").max(20, "Phone number must be less than 20 characters"),
});

const FinalizeBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const selectedPackage = location.state?.selectedPackage || {
    id: "standard",
    name: "STANDARD PACKAGE",
    price: 740,
  };

  const generateBookingId = () => {
    return `ZP-${Math.floor(10000000 + Math.random() * 90000000)}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = bookingSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    // Simulate email sending with alerts (as shown in original)
    const bookingId = generateBookingId();

    // Simulate first alert - Email to customer
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast({
      title: `📧 Email Sent to ${formData.email}`,
      description: `Subject: Booking Confirmed: ${bookingId}`,
    });

    // Simulate second alert - Admin notification
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast({
      title: "📧 Admin Notification Sent!",
      description: `Subject: New Booking Alert: ${bookingId}`,
    });

    // Navigate to success page
    await new Promise((resolve) => setTimeout(resolve, 500));
    navigate("/booking-success", {
      state: {
        bookingId,
        customerName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        package: selectedPackage,
      },
    });
  };

  return (
    <div className="min-h-screen bg-muted">
      <Header />

      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl shadow-xl p-8 lg:p-12">
              {/* Header */}
              <div className="text-center mb-10">
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground uppercase tracking-wide">
                  Finalize Booking
                </h1>
                <p className="text-muted-foreground mt-3 uppercase text-sm tracking-widest">
                  Almost there! Provide your details to confirm availability.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="fullName"
                      className="text-muted-foreground uppercase text-xs tracking-wider"
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={`h-14 bg-muted/50 border-0 ${
                        errors.fullName ? "ring-2 ring-destructive" : ""
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-destructive">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-muted-foreground uppercase text-xs tracking-wider"
                    >
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className={`h-14 bg-muted/50 border-0 ${
                        errors.email ? "ring-2 ring-destructive" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-muted-foreground uppercase text-xs tracking-wider"
                  >
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className={`h-14 bg-muted/50 border-0 md:w-1/2 ${
                      errors.phone ? "ring-2 ring-destructive" : ""
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                  )}
                </div>

                {/* Price Summary */}
                <div className="bg-muted/50 rounded-xl p-6 mt-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-primary uppercase text-sm font-semibold tracking-wider">
                        Total Amount
                      </p>
                      <p className="text-3xl font-bold text-foreground mt-1">
                        $ {selectedPackage.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground uppercase text-sm tracking-wider">
                        Selected Package
                      </p>
                      <p className="text-primary font-semibold uppercase tracking-wide">
                        {selectedPackage.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="w-full h-16 text-lg font-semibold uppercase tracking-wide"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    <>
                      Confirm & Book My Trip
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Lock className="w-4 h-4" />
                  <span className="text-sm uppercase tracking-wider">
                    Secure SSL Encrypted Checkout
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FinalizeBooking;
