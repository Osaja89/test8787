import { useLocation, useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { CheckCircle, Copy, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const bookingData = location.state || {
    bookingId: "ZP-00000000",
    customerName: "Guest",
    email: "",
    phone: "",
    package: { name: "STANDARD PACKAGE", price: 740 },
  };

  const handleCopyBookingId = () => {
    navigator.clipboard.writeText(bookingData.bookingId);
    toast({
      title: "Copied!",
      description: "Booking ID copied to clipboard",
    });
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Hello! I just completed my Ziarat booking.\n\nBooking ID: ${bookingData.bookingId}\nName: ${bookingData.customerName}\nPackage: ${bookingData.package.name}\n\nPlease confirm my booking.`
    );
    window.open(`https://wa.me/923001234567?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-muted">
      <Header />

      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <div className="bg-card rounded-2xl shadow-xl p-8 lg:p-12 text-center border-t-4 border-emerald-500">
              {/* Success Icon */}
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-14 h-14 text-emerald-500" />
              </div>

              {/* Success Message */}
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Booking Completed!
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Your spiritual journey has been planned successfully.
                <br />
                Please contact us to confirm availability.
              </p>

              {/* Booking ID */}
              <div className="bg-muted/50 rounded-xl p-6 mb-8">
                <p className="text-muted-foreground uppercase text-sm tracking-wider mb-2">
                  Your Unique Booking ID
                </p>
                <div className="flex items-center justify-center gap-3">
                  <p className="text-2xl font-bold text-primary tracking-wider">
                    {bookingData.bookingId}
                  </p>
                  <button
                    onClick={handleCopyBookingId}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button
                  size="lg"
                  onClick={handleWhatsAppContact}
                  className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Contact via WhatsApp
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="w-full h-14 font-semibold"
                >
                  <Link to="/">Return to Home</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
