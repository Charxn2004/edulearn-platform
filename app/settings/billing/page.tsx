"use client"

import type React from "react"

import { useState } from "react"
import {
  CreditCard,
  Download,
  Check,
  Shield,
  Clock,
  Users,
  BookOpen,
  FileText,
  Plus,
  Trash,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function BillingPage() {
  const { toast } = useToast()
  const [currentPlan, setCurrentPlan] = useState("pro")
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [isChangingPlan, setIsChangingPlan] = useState(false)
  const [isAddingPaymentMethod, setIsAddingPaymentMethod] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card1")
  const [cardFormData, setCardFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)

  // Mock subscription plans
  const plans = {
    basic: {
      name: "Basic",
      monthlyPrice: 9.99,
      yearlyPrice: 99.99,
      features: ["Access to 50+ courses", "Basic course materials", "Course completion certificates", "24/7 support"],
      limitations: ["No downloadable resources", "No live sessions", "Limited course selection"],
    },
    pro: {
      name: "Professional",
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      features: [
        "Access to 200+ courses",
        "Downloadable resources",
        "Course completion certificates",
        "Live Q&A sessions",
        "Priority support",
        "Offline viewing",
      ],
      limitations: ["Limited instructor contact"],
    },
    premium: {
      name: "Premium",
      monthlyPrice: 29.99,
      yearlyPrice: 299.99,
      features: [
        "Access to all courses",
        "Downloadable resources",
        "Course completion certificates",
        "Live Q&A sessions",
        "1-on-1 instructor sessions",
        "Priority support",
        "Offline viewing",
        "Early access to new courses",
      ],
      limitations: [],
    },
  }

  // Mock payment methods
  const paymentMethods = [
    {
      id: "card1",
      type: "credit_card",
      brand: "Visa",
      last4: "4242",
      expMonth: 12,
      expYear: 2025,
      isDefault: true,
    },
    {
      id: "card2",
      type: "credit_card",
      brand: "Mastercard",
      last4: "5555",
      expMonth: 8,
      expYear: 2024,
      isDefault: false,
    },
  ]

  // Mock billing history
  const billingHistory = [
    {
      id: "INV-001",
      date: "Mar 1, 2025",
      amount: 19.99,
      status: "paid",
      description: "Professional Plan - Monthly",
    },
    {
      id: "INV-002",
      date: "Feb 1, 2025",
      amount: 19.99,
      status: "paid",
      description: "Professional Plan - Monthly",
    },
    {
      id: "INV-003",
      date: "Jan 1, 2025",
      amount: 19.99,
      status: "paid",
      description: "Professional Plan - Monthly",
    },
    {
      id: "INV-004",
      date: "Dec 1, 2024",
      amount: 19.99,
      status: "paid",
      description: "Professional Plan - Monthly",
    },
  ]

  const handlePlanChange = (plan: string) => {
    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      setCurrentPlan(plan)
      setIsChangingPlan(false)
      setIsProcessing(false)

      toast({
        title: "Plan Updated",
        description: `Your subscription has been updated to the ${plans[plan as keyof typeof plans].name} plan.`,
      })
    }, 1500)
  }

  const handleBillingCycleChange = (cycle: string) => {
    setBillingCycle(cycle)

    toast({
      title: "Billing Cycle Updated",
      description: `Your billing cycle has been updated to ${cycle}.`,
    })
  }

  const handleAddPaymentMethod = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      setIsAddingPaymentMethod(false)
      setIsProcessing(false)

      toast({
        title: "Payment Method Added",
        description: "Your new payment method has been added successfully.",
      })

      // Reset form
      setCardFormData({
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",
      })
    }, 1500)
  }

  const handleRemovePaymentMethod = (id: string) => {
    toast({
      title: "Payment Method Removed",
      description: "Your payment method has been removed successfully.",
    })
  }

  const handleSetDefaultPaymentMethod = (id: string) => {
    setSelectedPaymentMethod(id)

    toast({
      title: "Default Payment Method Updated",
      description: "Your default payment method has been updated successfully.",
    })
  }

  const handleCancelSubscription = () => {
    toast({
      title: "Subscription Cancelled",
      description: "Your subscription has been cancelled. You will have access until the end of your billing period.",
      variant: "destructive",
    })
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscription & Billing</h1>
          <p className="text-muted-foreground">Manage your subscription, payment methods, and billing history</p>
        </div>
      </div>

      <Tabs defaultValue="subscription" className="space-y-8">
        <TabsList className="w-full justify-start border-b rounded-none">
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="billing-history">Billing History</TabsTrigger>
        </TabsList>

        {/* Subscription Tab */}
        <TabsContent value="subscription" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                You are currently on the {plans[currentPlan as keyof typeof plans].name} plan.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 p-4 bg-primary/5 rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">{plans[currentPlan as keyof typeof plans].name}</h3>
                    <Badge variant="default">Current Plan</Badge>
                  </div>
                  <p className="text-muted-foreground mt-1">
                    {billingCycle === "monthly"
                      ? `$${plans[currentPlan as keyof typeof plans].monthlyPrice}/month`
                      : `$${plans[currentPlan as keyof typeof plans].yearlyPrice}/year`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Dialog open={isChangingPlan} onOpenChange={setIsChangingPlan}>
                    <DialogTrigger asChild>
                      <Button variant="outline">Change Plan</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Change Subscription Plan</DialogTitle>
                        <DialogDescription>Choose the plan that best fits your needs.</DialogDescription>
                      </DialogHeader>

                      <div className="py-6">
                        <div className="flex justify-end mb-6">
                          <div className="flex items-center space-x-2">
                            <Label htmlFor="billing-cycle">Bill Monthly</Label>
                            <Switch
                              id="billing-cycle"
                              checked={billingCycle === "yearly"}
                              onCheckedChange={(checked) => handleBillingCycleChange(checked ? "yearly" : "monthly")}
                            />
                            <Label htmlFor="billing-cycle">Bill Yearly (Save 15%)</Label>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {Object.entries(plans).map(([key, plan]) => (
                            <Card key={key} className={`relative ${currentPlan === key ? "border-primary" : ""}`}>
                              {currentPlan === key && (
                                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded-bl-md rounded-tr-md">
                                  Current
                                </div>
                              )}
                              <CardHeader>
                                <CardTitle>{plan.name}</CardTitle>
                                <CardDescription>
                                  {billingCycle === "monthly"
                                    ? `$${plan.monthlyPrice}/month`
                                    : `$${plan.yearlyPrice}/year`}
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div>
                                  <h4 className="font-medium mb-2">Features</h4>
                                  <ul className="space-y-2">
                                    {plan.features.map((feature, i) => (
                                      <li key={i} className="flex items-start">
                                        <Check className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                        <span className="text-sm">{feature}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {plan.limitations.length > 0 && (
                                  <div>
                                    <h4 className="font-medium mb-2">Limitations</h4>
                                    <ul className="space-y-2">
                                      {plan.limitations.map((limitation, i) => (
                                        <li key={i} className="flex items-start">
                                          <AlertCircle className="h-4 w-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                                          <span className="text-sm">{limitation}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </CardContent>
                              <CardFooter>
                                <Button
                                  className="w-full"
                                  variant={currentPlan === key ? "outline" : "default"}
                                  onClick={() => handlePlanChange(key)}
                                  disabled={isProcessing || currentPlan === key}
                                >
                                  {isProcessing ? (
                                    <>
                                      <span className="animate-spin mr-2">⏳</span>
                                      Processing...
                                    </>
                                  ) : currentPlan === key ? (
                                    "Current Plan"
                                  ) : (
                                    "Select Plan"
                                  )}
                                </Button>
                              </CardFooter>
                            </Card>
                          ))}
                        </div>
                      </div>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsChangingPlan(false)}>
                          Cancel
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="text-red-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                      >
                        Cancel
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Cancel Subscription</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to cancel your subscription? You will lose access to premium features at
                          the end of your billing period.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" className="mr-2">
                          Keep Subscription
                        </Button>
                        <Button variant="destructive" onClick={handleCancelSubscription}>
                          Cancel Subscription
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Plan Details</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <BookOpen className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Course Access</h4>
                        <p className="text-sm text-muted-foreground">
                          {currentPlan === "basic"
                            ? "50+ courses"
                            : currentPlan === "pro"
                              ? "200+ courses"
                              : "All courses"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FileText className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Resources</h4>
                        <p className="text-sm text-muted-foreground">
                          {currentPlan === "basic" ? "Basic course materials" : "Downloadable resources"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Instructor Access</h4>
                        <p className="text-sm text-muted-foreground">
                          {currentPlan === "basic"
                            ? "No instructor contact"
                            : currentPlan === "pro"
                              ? "Limited instructor contact"
                              : "1-on-1 instructor sessions"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Support</h4>
                        <p className="text-sm text-muted-foreground">
                          {currentPlan === "basic" ? "24/7 support" : "Priority support"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Billing Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Billing Cycle</h4>
                      <p>{billingCycle === "monthly" ? "Monthly" : "Yearly"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Next Billing Date</h4>
                      <p>April 1, 2025</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Payment Method</h4>
                      <p>Visa ending in 4242</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Subscription Started</h4>
                      <p>January 1, 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Methods Tab */}
        <TabsContent value="payment-methods" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods and set your default payment method.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-lg border ${
                      method.isDefault ? "bg-primary/5 border-primary/20" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4 md:mb-0">
                      {method.brand === "Visa" ? (
                        <div className="h-10 w-14 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">
                          VISA
                        </div>
                      ) : method.brand === "Mastercard" ? (
                        <div className="h-10 w-14 bg-red-600 rounded-md flex items-center justify-center text-white font-bold">
                          MC
                        </div>
                      ) : (
                        <CreditCard className="h-10 w-10" />
                      )}
                      <div>
                        <p className="font-medium">
                          {method.brand} •••• {method.last4}
                          {method.isDefault && (
                            <Badge variant="outline" className="ml-2">
                              Default
                            </Badge>
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Expires {method.expMonth}/{method.expYear}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                      {!method.isDefault && (
                        <Button variant="outline" size="sm" onClick={() => handleSetDefaultPaymentMethod(method.id)}>
                          Set as Default
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                        onClick={() => handleRemovePaymentMethod(method.id)}
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Dialog open={isAddingPaymentMethod} onOpenChange={setIsAddingPaymentMethod}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Payment Method</DialogTitle>
                    <DialogDescription>Add a new credit or debit card to your account.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddPaymentMethod}>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                          value={cardFormData.cardNumber}
                          onChange={(e) => setCardFormData({ ...cardFormData, cardNumber: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-name">Cardholder Name</Label>
                        <Input
                          id="card-name"
                          placeholder="John Doe"
                          value={cardFormData.cardName}
                          onChange={(e) => setCardFormData({ ...cardFormData, cardName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry-date">Expiry Date</Label>
                          <Input
                            id="expiry-date"
                            placeholder="MM/YY"
                            value={cardFormData.expiryDate}
                            onChange={(e) => setCardFormData({ ...cardFormData, expiryDate: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={cardFormData.cvv}
                            onChange={(e) => setCardFormData({ ...cardFormData, cvv: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">
                          Your payment information is encrypted and secure.
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" type="button" onClick={() => setIsAddingPaymentMethod(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isProcessing}>
                        {isProcessing ? (
                          <>
                            <span className="animate-spin mr-2">⏳</span>
                            Processing...
                          </>
                        ) : (
                          "Add Payment Method"
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing History Tab */}
        <TabsContent value="billing-history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View and download your past invoices.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">Invoice</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {billingHistory.map((invoice) => (
                        <tr
                          key={invoice.id}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-4 align-middle">{invoice.id}</td>
                          <td className="p-4 align-middle">{invoice.date}</td>
                          <td className="p-4 align-middle">${invoice.amount.toFixed(2)}</td>
                          <td className="p-4 align-middle">
                            <Badge
                              variant="outline"
                              className={
                                invoice.status === "paid"
                                  ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
                                  : "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800"
                              }
                            >
                              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle text-right">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

