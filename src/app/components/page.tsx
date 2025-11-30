"use client";

import { useState } from 'react';
import Toast from '@/components/Toast';
import CodeEditor from '@/components/Editor/CodeEditor';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Loader from '@/components/ui/Loader';
import ProgressBar from '@/components/ui/ProgressBar';
import Switch from '@/components/ui/Switch';
import Checkbox from '@/components/ui/Checkbox';
import RadioGroup from '@/components/ui/RadioGroup';
import Select from '@/components/ui/Select';
import Tabs from '@/components/ui/Tabs';
import Accordion from '@/components/ui/Accordion';
import Alert from '@/components/ui/Alert';
import Avatar from '@/components/ui/Avatar';
import Skeleton from '@/components/ui/Skeleton';
import FileUpload from '@/components/ui/FileUpload';
import Tooltip from '@/components/ui/Tooltip';
import Dropdown from '@/components/ui/Dropdown';
import Pagination from '@/components/ui/Pagination';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Table from '@/components/ui/Table';

export default function ComponentsPage() {
  const [toastConfig, setToastConfig] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({ show: false, message: '', type: 'success' });
  
  const [codeValue, setCodeValue] = useState('// Welcome to the code editor\nconst hello = "world";\nconsole.log(hello);');
  const [inputValue, setInputValue] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [progress, setProgress] = useState(45);
  const [isLoading, setIsLoading] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [selectValue, setSelectValue] = useState('');
  const [showAlert, setShowAlert] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Sample data for new components
  const dropdownItems = [
    { label: 'Profile', value: 'profile', icon: '👤' },
    { label: 'Settings', value: 'settings', icon: '⚙️' },
    { label: 'Logout', value: 'logout', icon: '🚪' },
  ];

  const breadcrumbItems = [
    { label: 'Home', onClick: () => showToast('Home clicked', 'info'), icon: '🏠' },
    { label: 'Components', onClick: () => showToast('Components clicked', 'info') },
    { label: 'UI Kit' },
  ];

  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', status: 'Active' },
  ];

  const tableColumns = [
    { key: 'id', label: 'ID', width: '60px' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { 
      key: 'status', 
      label: 'Status', 
      render: (value: string) => (
        <Badge variant={value === 'Active' ? 'success' : 'secondary'}>
          {value}
        </Badge>
      )
    },
  ];

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToastConfig({ show: true, message, type });
  };

  const handleFilesChange = (files: any[]) => {
    setUploadedFiles(files);
  };

  const handleFileUpload = async (files: File[]) => {
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    showToast(`Successfully uploaded ${files.length} file(s)`, 'success');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-violet-400 to-purple-600 rounded-full blur-3xl opacity-80"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-3xl opacity-80"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-br from-pink-400 to-rose-600 rounded-full blur-3xl opacity-80"></div>
      </div>
      
      {/* Glass overlay for better readability */}
      <div className="absolute inset-0 backdrop-blur-[100px] bg-white/20"></div>
      
      {/* Main content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-10 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-indigo-600/20 blur-3xl -z-10"></div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            ComboKit UI
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className="text-gray-600 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Bộ UI components hiện đại với thiết kế glassmorphism và hiệu ứng đặc biệt
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button variant="gradient" size="lg">
              ✨ Explore Components
            </Button>
            <Button variant="glass" size="lg">
              📚 Documentation
            </Button>
          </div>
        </div>

        {/* Components Grid */}
        <div className="space-y-8">
          
          {/* Buttons Section */}
          <section className="animate-fade-in delay-1000">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full"></div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Interactive Buttons ✨
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card variant="glass" className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  🎨 Style Variants
                </h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">Gradient & Effects</p>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="primary" size="md">Primary</Button>
                      <Button variant="gradient" size="md">Gradient</Button>
                      <Button variant="neon" size="md">Neon</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-600">Glass & Outline</p>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="glass" size="md">Glass</Button>
                      <Button variant="secondary" size="md">Secondary</Button>
                      <Button variant="outline" size="md">Outline</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-600">Sizes</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button variant="primary" size="sm">Small</Button>
                      <Button variant="primary" size="md">Medium</Button>
                      <Button variant="primary" size="lg">Large</Button>
                    </div>
                  </div>
                </div>
              </Card>

              <Card variant="gradient" className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  ⚡ Interactive Features
                </h3>
                <div className="space-y-3">
                  <Button 
                    variant="gradient" 
                    size="lg"
                    className="w-full"
                    onClick={() => showToast('🎉 Awesome interaction!', 'success')}
                  >
                    🚀 Show Success Toast
                  </Button>
                  
                  <Button 
                    variant="neon" 
                    size="lg"
                    className="w-full"
                    onClick={() => showToast('⚠️ Something went wrong', 'error')}
                  >
                    ❌ Show Error Toast
                  </Button>
                  
                  <Button 
                    variant="glass" 
                    size="lg"
                    className="w-full"
                    onClick={() => showToast('ℹ️ Helpful information', 'info')}
                  >
                    📝 Show Info Toast
                  </Button>
                  
                  <div className="pt-4 border-t border-white/20">
                    <Button 
                      variant="danger" 
                      size="md"
                      loading={isLoading}
                      onClick={() => {
                        setIsLoading(true);
                        setTimeout(() => {
                          setIsLoading(false);
                          showToast('Loading completed!', 'success');
                        }, 2000);
                      }}
                      className="w-full"
                    >
                      {isLoading ? 'Loading...' : '🔄 Test Loading State'}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Toast Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-l-4 border-green-500 pl-4">
              Toast Notifications
            </h2>
            <Card className="p-4">
              <div className="space-y-3">
                <p className="text-gray-600 mb-3">Click các button để xem toast notifications:</p>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    variant="primary" 
                    onClick={() => showToast('Thành công! Thao tác đã được thực hiện.', 'success')}
                  >
                    Success Toast
                  </Button>
                  <Button 
                    variant="danger" 
                    onClick={() => showToast('Lỗi! Có gì đó không đúng.', 'error')}
                  >
                    Error Toast
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={() => showToast('Thông tin quan trọng!', 'info')}
                  >
                    Info Toast
                  </Button>
                </div>
              </div>
            </Card>
          </section>

          {/* Badges Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-l-4 border-purple-500 pl-3">
              Badges
            </h2>
            <Card className="p-4">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Badge variant="success">Active</Badge>
                  <Badge variant="warning">Pending</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="info">New</Badge>
                  <Badge variant="secondary">Draft</Badge>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="success" size="sm">Small</Badge>
                  <Badge variant="primary" size="md">Medium</Badge>
                  <Badge variant="secondary" size="lg">Large</Badge>
                </div>
              </div>
            </Card>
          </section>

          {/* Input Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-l-4 border-yellow-500 pl-4">
              Input Fields
            </h2>
            <Card className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="user@example.com"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                  />
                  <Input
                    label="Disabled Input"
                    type="text"
                    placeholder="This is disabled"
                    disabled
                  />
                </div>
                <div className="space-y-4">
                  <Input
                    label="Search"
                    type="search"
                    placeholder="Tìm kiếm..."
                    icon="search"
                  />
                  <Input
                    label="With Error"
                    type="text"
                    placeholder="Invalid input"
                    error="This field is required"
                  />
                  <Input
                    label="Success State"
                    type="text"
                    placeholder="Valid input"
                    success="Looks good!"
                  />
                </div>
              </div>
            </Card>
          </section>

          {/* Cards Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-l-4 border-red-500 pl-4">
              Cards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Basic Card</h3>
                <p className="text-gray-600">This is a basic card with some content.</p>
              </Card>
              <Card className="p-4 border-2 border-blue-500">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">Highlighted Card</h3>
                <p className="text-gray-600">This card has a blue border highlight.</p>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-purple-100 to-pink-100">
                <h3 className="text-lg font-semibold text-purple-700 mb-2">Gradient Card</h3>
                <p className="text-gray-600">This card has a gradient background.</p>
              </Card>
            </div>
          </section>

          {/* Modal Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-l-4 border-indigo-500 pl-3">
              Modal
            </h2>
            <Card className="p-4">
              <Button variant="primary" onClick={() => setModalOpen(true)}>
                Open Modal
              </Button>
            </Card>
          </section>

          {/* Loaders Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-l-4 border-pink-500 pl-4">
              Loading States
            </h2>
            <Card className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700">Spinners</h3>
                  <div className="flex items-center space-x-4">
                    <Loader variant="spinner" size="sm" />
                    <Loader variant="spinner" size="md" />
                    <Loader variant="spinner" size="lg" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700">Dots</h3>
                  <div className="flex items-center space-x-4">
                    <Loader variant="dots" size="sm" />
                    <Loader variant="dots" size="md" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700">Pulse</h3>
                  <div className="flex items-center space-x-4">
                    <Loader variant="pulse" size="sm" />
                    <Loader variant="pulse" size="md" />
                    <Loader variant="pulse" size="lg" />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button 
                  variant="primary" 
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => setIsLoading(false), 3000);
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? <Loader variant="spinner" size="sm" className="mr-2" /> : null}
                  {isLoading ? 'Loading...' : 'Simulate Loading'}
                </Button>
              </div>
            </Card>
          </section>

          {/* Progress Bars Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-l-4 border-cyan-500 pl-4">
              Progress Bars
            </h2>
            <Card className="p-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Different Variants</h3>
                  <div className="space-y-4">
                    <ProgressBar value={progress} variant="default" showLabel />
                    <ProgressBar value={75} variant="success" showLabel />
                    <ProgressBar value={60} variant="warning" showLabel />
                    <ProgressBar value={25} variant="error" showLabel />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Different Sizes</h3>
                  <div className="space-y-4">
                    <ProgressBar value={progress} size="sm" />
                    <ProgressBar value={progress} size="md" />
                    <ProgressBar value={progress} size="lg" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => setProgress(Math.min(progress + 10, 100))}
                  >
                    +10%
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => setProgress(Math.max(progress - 10, 0))}
                  >
                    -10%
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setProgress(Math.floor(Math.random() * 101))}
                  >
                    Random
                  </Button>
                </div>
              </div>
            </Card>
          </section>

          {/* Form Controls Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-l-4 border-green-600 pl-4">
              Form Controls
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Switches</h3>
                <div className="space-y-4">
                  <Switch
                    checked={switchValue}
                    onChange={setSwitchValue}
                    label="Enable notifications"
                  />
                  <Switch
                    checked={true}
                    onChange={() => {}}
                    label="Dark mode"
                    size="lg"
                  />
                  <Switch
                    checked={false}
                    onChange={() => {}}
                    label="Disabled switch"
                    disabled
                  />
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Checkboxes</h3>
                <div className="space-y-4">
                  <Checkbox
                    checked={checkboxValue}
                    onChange={setCheckboxValue}
                    label="Accept terms and conditions"
                  />
                  <Checkbox
                    checked={true}
                    onChange={() => {}}
                    label="Subscribe to newsletter"
                    size="lg"
                  />
                  <Checkbox
                    checked={false}
                    onChange={() => {}}
                    indeterminate={true}
                    label="Indeterminate state"
                  />
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card className="p-4">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Radio Groups</h3>
                <RadioGroup
                  name="demo-radio"
                  value={radioValue}
                  onChange={setRadioValue}
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                    { value: 'option3', label: 'Option 3 (disabled)', disabled: true }
                  ]}
                />
              </Card>

              <Card className="p-4">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Select Dropdown</h3>
                <Select
                  value={selectValue}
                  onChange={setSelectValue}
                  placeholder="Choose a framework"
                  options={[
                    { value: 'react', label: 'React' },
                    { value: 'vue', label: 'Vue.js' },
                    { value: 'angular', label: 'Angular' },
                    { value: 'svelte', label: 'Svelte', disabled: true }
                  ]}
                />
              </Card>
            </div>
          </section>

          {/* Tabs Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-l-4 border-purple-600 pl-4">
              Tabs
            </h2>
            <Card className="p-4">
              <Tabs
                tabs={[
                  {
                    id: 'tab1',
                    label: 'Default Tabs',
                    content: (
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Default Tab Content</h4>
                        <p className="text-gray-600">This is the content for the default tab style.</p>
                      </div>
                    )
                  },
                  {
                    id: 'tab2',
                    label: 'Second Tab',
                    content: (
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Second Tab</h4>
                        <p className="text-gray-600">Content for the second tab goes here.</p>
                      </div>
                    )
                  },
                  {
                    id: 'tab3',
                    label: 'Disabled',
                    disabled: true,
                    content: <div>This tab is disabled</div>
                  }
                ]}
              />
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card className="p-4">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Pills Style</h3>
                <Tabs
                  variant="pills"
                  tabs={[
                    { id: 'pill1', label: 'Home', content: <p className="text-gray-600">Home content</p> },
                    { id: 'pill2', label: 'About', content: <p className="text-gray-600">About content</p> },
                    { id: 'pill3', label: 'Contact', content: <p className="text-gray-600">Contact content</p> }
                  ]}
                />
              </Card>

              <Card className="p-4">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Underline Style</h3>
                <Tabs
                  variant="underline"
                  tabs={[
                    { id: 'under1', label: 'Dashboard', content: <p className="text-gray-600">Dashboard content</p> },
                    { id: 'under2', label: 'Settings', content: <p className="text-gray-600">Settings content</p> },
                    { id: 'under3', label: 'Profile', content: <p className="text-gray-600">Profile content</p> }
                  ]}
                />
              </Card>
            </div>
          </section>

          {/* Accordion Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-l-4 border-teal-500 pl-4">
              Accordion
            </h2>
            <Card className="p-4">
              <Accordion
                items={[
                  {
                    id: 'acc1',
                    title: 'What is React?',
                    content: (
                      <p className="text-gray-600">
                        React is a JavaScript library for building user interfaces. It's maintained by Facebook and a community of individual developers and companies.
                      </p>
                    )
                  },
                  {
                    id: 'acc2',
                    title: 'How does virtual DOM work?',
                    content: (
                      <div className="text-gray-600">
                        <p className="mb-2">The virtual DOM is a programming concept where a "virtual" representation of the UI is kept in memory and synced with the "real" DOM.</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Creates a virtual copy of the DOM</li>
                          <li>Compares changes (diffing)</li>
                          <li>Updates only what changed</li>
                        </ul>
                      </div>
                    )
                  },
                  {
                    id: 'acc3',
                    title: 'Disabled Item',
                    disabled: true,
                    content: <p>This content is not accessible</p>
                  }
                ]}
                allowMultiple={true}
                defaultOpen={['acc1']}
              />
            </Card>
          </section>

          {/* Alerts Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-l-4 border-red-500 pl-4">
              Alerts
            </h2>
            <div className="space-y-4">
              {showAlert && (
                <Alert
                  variant="info"
                  title="Information"
                  dismissible
                  onDismiss={() => setShowAlert(false)}
                >
                  This is an informational alert that can be dismissed.
                </Alert>
              )}
              
              <Alert variant="success" title="Success">
                Your changes have been saved successfully!
              </Alert>
              
              <Alert variant="warning">
                Please review your input before submitting.
              </Alert>
              
              <Alert variant="error" title="Error">
                There was an error processing your request. Please try again.
              </Alert>
              
              {!showAlert && (
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={() => setShowAlert(true)}
                >
                  Show Dismissible Alert Again
                </Button>
              )}
            </div>
          </section>

          {/* Avatar Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-l-4 border-pink-500 pl-4">
              Avatars
            </h2>
            <Card className="p-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Different Sizes</h3>
                  <div className="flex items-center space-x-4">
                    <Avatar size="xs" fallback="XS" />
                    <Avatar size="sm" fallback="SM" />
                    <Avatar size="md" fallback="MD" />
                    <Avatar size="lg" fallback="LG" />
                    <Avatar size="xl" fallback="XL" />
                    <Avatar size="2xl" fallback="2XL" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-4">With Status</h3>
                  <div className="flex items-center space-x-4">
                    <Avatar fallback="ON" status="online" />
                    <Avatar fallback="OF" status="offline" />
                    <Avatar fallback="AW" status="away" />
                    <Avatar fallback="BY" status="busy" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-4">With Images</h3>
                  <div className="flex items-center space-x-4">
                    <Avatar 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                      alt="User 1" 
                      size="lg"
                    />
                    <Avatar 
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b639?w=150&h=150&fit=crop&crop=face" 
                      alt="User 2" 
                      size="lg" 
                      status="online"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Skeleton Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-l-4 border-gray-500 pl-4">
              Skeletons
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-4">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Text Skeletons</h3>
                <div className="space-y-4">
                  <Skeleton variant="text" />
                  <Skeleton variant="text" lines={3} />
                  <Skeleton variant="text" width="60%" />
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Avatar Skeletons</h3>
                <div className="flex space-x-4">
                  <Skeleton variant="circular" width="40px" height="40px" />
                  <Skeleton variant="circular" width="60px" height="60px" />
                  <Skeleton variant="circular" width="80px" height="80px" />
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Image Skeleton</h3>
                <Skeleton variant="rectangular" height="120px" />
              </Card>
            </div>
          </section>

          {/* File Upload Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-l-4 border-green-500 pl-4">
              File Upload
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-4">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Single File Upload</h3>
                <FileUpload
                  accept="image/*,.pdf,.doc,.docx"
                  maxSize={5}
                  onFilesChange={handleFilesChange}
                  onUpload={handleFileUpload}
                />
              </Card>

              <Card className="p-4">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Multiple File Upload</h3>
                <FileUpload
                  multiple
                  maxFiles={10}
                  maxSize={10}
                  onFilesChange={handleFilesChange}
                  onUpload={handleFileUpload}
                />
              </Card>
            </div>

            <Card className="p-4 mt-4">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Drag & Drop Area</h3>
              <p className="text-sm text-gray-600 mb-4">
                This upload component supports:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4">
                <li>• Drag and drop files</li>
                <li>• Click to browse files</li>
                <li>• File type validation</li>
                <li>• File size validation</li>
                <li>• Image preview</li>
                <li>• Upload progress tracking</li>
                <li>• Multiple file support</li>
              </ul>
              <FileUpload
                multiple
                accept="*/*"
                maxSize={50}
                maxFiles={5}
                onFilesChange={(files) => {
                  console.log('Files changed:', files);
                  showToast(`${files.length} file(s) selected`, 'info');
                }}
                onUpload={async (files) => {
                  showToast(`Starting upload of ${files.length} file(s)...`, 'info');
                  await handleFileUpload(files);
                }}
              />
            </Card>
          </section>

          {/* Navigation Components */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Navigation & Utils 🧭
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card variant="glass" className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Breadcrumb Navigation</h3>
                <div className="space-y-3">
                  <Breadcrumb items={breadcrumbItems} />
                  <Breadcrumb 
                    items={breadcrumbItems} 
                    separator=">"
                  />
                  <Breadcrumb 
                    items={breadcrumbItems} 
                    separator="•"
                  />
                </div>
              </Card>

              <Card variant="gradient" className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Dropdown Menu</h3>
                <div className="space-y-3">
                  <Dropdown
                    trigger={
                      <Button variant="secondary" size="md">
                        User Menu ▼
                      </Button>
                    }
                    items={dropdownItems}
                    onSelect={(value) => showToast(`Selected: ${value}`, 'info')}
                  />
                  
                  <Dropdown
                    trigger={
                      <Button variant="outline" size="md">
                        Actions ▼
                      </Button>
                    }
                    items={[
                      { label: 'Edit', value: 'edit' },
                      { label: 'Delete', value: 'delete' },
                      { label: 'Archive', value: 'archive', disabled: true },
                    ]}
                    onSelect={(value) => showToast(`Action: ${value}`, 'success')}
                    position="right"
                  />
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card variant="default" className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Tooltips</h3>
                <div className="flex flex-wrap gap-2">
                  <Tooltip content="This is a tooltip!" position="top">
                    <Button variant="primary" size="sm">Hover me (top)</Button>
                  </Tooltip>
                  
                  <Tooltip content="Bottom tooltip" position="bottom">
                    <Button variant="secondary" size="sm">Bottom</Button>
                  </Tooltip>
                  
                  <Tooltip content="Left side" position="left">
                    <Button variant="outline" size="sm">Left</Button>
                  </Tooltip>
                  
                  <Tooltip content="Right side tooltip with longer text" position="right">
                    <Button variant="glass" size="sm">Right</Button>
                  </Tooltip>
                </div>
              </Card>

              <Card variant="neon" className="p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Pagination</h3>
                <div className="space-y-3">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={10}
                    onPageChange={setCurrentPage}
                  />
                  
                  <Pagination
                    currentPage={3}
                    totalPages={20}
                    onPageChange={(page) => showToast(`Go to page ${page}`, 'info')}
                    maxVisiblePages={3}
                    showFirstLast={false}
                  />
                </div>
              </Card>
            </div>
          </section>

          {/* Data Display */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Data Display 📊
              </h2>
            </div>
            
            <Card variant="default" className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Table</h3>
              <Table
                columns={tableColumns}
                data={tableData}
                striped
                hoverable
              />
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-md font-medium text-gray-700 mb-3">Compact Table</h4>
                <Table
                  columns={tableColumns}
                  data={tableData}
                  compact
                />
              </div>
            </Card>
          </section>

          {/* Code Editor Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Code Editor ⌨️
              </h2>
            </div>
            <Card className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monaco Code Editor
                </label>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <CodeEditor
                  value={codeValue}
                  onChange={(value) => setCodeValue(value || '')}
                  language="javascript"
                  height="300px"
                />
              </div>
            </Card>
          </section>

        </div>
      </div>

      {/* Toast */}
      {toastConfig.show && (
        <Toast
          message={toastConfig.message}
          type={toastConfig.type}
          onClose={() => setToastConfig({ ...toastConfig, show: false })}
        />
      )}

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Example Modal</h3>
          <p className="text-gray-600 mb-4">
            Đây là một modal demo. Bạn có thể đặt bất kỳ content nào ở đây.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setModalOpen(false)}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
      </div>
    </div>
  );
}